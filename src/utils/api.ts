import axios, { AxiosResponse, AxiosError, AxiosTransformer } from 'axios';

import { StatusModifier } from 'app/screens/auth/shared';

type BaseResData = { [key in string | number]: any };
type ValidationResData = BaseResData & { validation: { keys: string[] } };

export const defaultTransformers: AxiosTransformer[] = ([] as any[]).concat(axios.defaults.transformResponse);

export const transformResponseToRawToken = (data: BaseResData) => data.authorization || data;

export const transformProperty = (from: string, to: string) => (data: BaseResData) => {
    if (data[from]) {
        const { [from]: target, ...rest } = data;

        return { [to]: target, ...rest };
    }

    return data;
};

export const deepTransformProperty = (from: string, to: string) => {
    const transformPropertyFromTo = transformProperty(from, to);
    const deepTransformPropertyFromTo = transformProperty(from, to);

    return (data: BaseResData) => {
        if (Array.isArray(data)) {
            return data.map(datum => (Array.isArray(datum) ? deepTransformPropertyFromTo(datum) : transformPropertyFromTo(datum)));
        }

        const newData = transformPropertyFromTo(data);

        return Object.entries(newData).reduce((acc, [key, value]) => {
            acc[key] = typeof value === 'object' ? deepTransformPropertyFromTo(value) : value;

            return acc;
        }, {});
    };
};

export const transformUnderscoredIdToId = transformProperty('_id', 'id');

export const deepTransformUnderscoredIdToId = deepTransformProperty('_id', 'id');

/**
 * Joi validation error message transformer.
 * nested parameters are not supported yet.
 */
export const transformResponseToValidationErrors = ({ message, validation }: ValidationResData) => {
    const regex = /because \["(.+?)"\s(.+?)\]/g;

    return validation.keys.filter(key => !!key).reduce((errors, fieldName, index) => {
        const match = index === 0 || regex.lastIndex !== 0 ? regex.exec(message) : undefined;
        if (match) {
            const [, label, msg] = match;
            errors[fieldName] = `${label} ${msg}`;
        }

        return errors;
    }, {});
};

export const getFormStatus = ({ status, data: { message } }: AxiosResponse) => ({
    message,
    modifier: status >= 200 && status < 300 ? StatusModifier.Success : StatusModifier.Error,
});

export const getFormStatusAndErrors = (request: Promise<any>): Promise<{ status?: any; errors?: any }> =>
    request.then(response => ({ status: getFormStatus(response) })).catch(({ response }: AxiosError) => {
        if (!response) {
            return {};
        }

        return response.data.validation
            ? {
                  errors: transformResponseToValidationErrors(response.data),
              }
            : {
                  status: getFormStatus(response),
              };
    });
