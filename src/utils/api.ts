import axios, { AxiosResponse, AxiosError, AxiosTransformer } from 'axios';

import { StatusModifier } from 'app/screens/auth/shared';

type BaseResData = { [key: string]: any };
type ValidationResData = BaseResData & { validation: { keys: string[] } };

export const defaultTransformers: AxiosTransformer[] = ([] as any[]).concat(axios.defaults.transformResponse);

export const transformResponseToRawToken = (data: BaseResData) => data.authorization || data;

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
    modifier: status >= 200 && status < 300 ? StatusModifier.success : StatusModifier.error,
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
