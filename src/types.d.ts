declare module '*.module.scss' {
    const classNames: {
        [className: string]: string;
    };
    export default classNames;
}

declare module '*.svg';
