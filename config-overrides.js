const path = require('path');
const cloneDeep = require('lodash.clonedeep');

const rewireHotLoader = require('react-app-rewire-hot-loader');
const rewireDll = require('react-app-rewire-dll');

const ruleChildren = loader => loader.use || loader.oneOf || (Array.isArray(loader.loader) && loader.loader) || [];

const findIndexAndRules = (rulesSource, ruleMatcher) => {
    let result = undefined;
    const rules = Array.isArray(rulesSource) ? rulesSource : ruleChildren(rulesSource);
    rules.some((rule, index) => (result = ruleMatcher(rule) ? { index, rules } : findIndexAndRules(ruleChildren(rule), ruleMatcher)));
    return result;
};

const findRule = (rulesSource, ruleMatcher) => {
    const { index, rules } = findIndexAndRules(rulesSource, ruleMatcher);
    return rules[index];
};

const cssRuleMatcher = rule => rule.test && String(rule.test) === String(/\.css$/);

const createLoaderMatcher = loader => rule => rule.loader && rule.loader.indexOf(`${path.sep}${loader}${path.sep}`) !== -1;
const cssLoaderMatcher = createLoaderMatcher('css-loader');
const postcssLoaderMatcher = createLoaderMatcher('postcss-loader');
const fileLoaderMatcher = createLoaderMatcher('file-loader');

const addBeforeRule = (rulesSource, ruleMatcher, value) => {
    const { index, rules } = findIndexAndRules(rulesSource, ruleMatcher);
    rules.splice(index, 0, value);
};

const addAfterRule = (rulesSource, ruleMatcher, value) => {
    const { index, rules } = findIndexAndRules(rulesSource, ruleMatcher);
    rules.splice(index + 1, 0, value);
};

module.exports = (config, env) => {
    rewireHotLoader(config, env);

    if (env === 'development') {
        rewireDll({
            entry: {
                vendor: ['tslib', 'react', 'react-dom', 'react-router', 'react-router-dom'],
            },
            filename: '[name].dll.js',
            path: 'static/js',
        })(config, env);
    }

    // rewire css modules
    const cssRule = findRule(config.module.rules, cssRuleMatcher);
    const sassRule = cloneDeep(cssRule);
    const cssModulesRule = cloneDeep(cssRule);

    cssRule.exclude = /\.module\.css$/;
    cssModulesRule.test = /\.module\.css$/;

    const cssModulesRuleCssLoader = findRule(cssModulesRule, cssLoaderMatcher);
    cssModulesRuleCssLoader.options = {
        camelCase: true,
        localIdentName: env === 'development' ? '[path][name]__[local]' : '[hash:base64:8]',
        modules: true,
        ...cssModulesRuleCssLoader.options,
    };
    addBeforeRule(config.module.rules, fileLoaderMatcher, cssModulesRule);

    const sassResourcesLoader = {
        loader: require.resolve('sass-resources-loader'),
        options: {
            resources: path.resolve(__dirname, 'src/app/shared/scss/main.scss'),
        },
    };
    const sassLoader = require.resolve('sass-loader');

    sassRule.test = /\.scss$/;
    sassRule.exclude = /\.module\.scss$/;
    addAfterRule(sassRule, postcssLoaderMatcher, sassResourcesLoader);
    addAfterRule(sassRule, postcssLoaderMatcher, sassLoader);
    addBeforeRule(config.module.rules, fileLoaderMatcher, sassRule);

    const sassModulesRule = cloneDeep(cssModulesRule);

    sassModulesRule.test = /\.module\.scss$/;
    addAfterRule(sassModulesRule, postcssLoaderMatcher, sassResourcesLoader);
    addAfterRule(sassModulesRule, postcssLoaderMatcher, sassLoader);
    addBeforeRule(config.module.rules, fileLoaderMatcher, sassModulesRule);

    return config;
};
