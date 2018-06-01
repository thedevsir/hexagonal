import axios, { AxiosResponse, AxiosError, AxiosTransformer } from 'axios';
import { FormikActions } from 'formik';

type BaseResData = { [key: string]: any };
type ValidationResData = BaseResData & { validation: { keys: string[] } };

export const defaultTransformers: AxiosTransformer[] = ([] as any[]).concat(axios.defaults.transformResponse);

export const transformResponseToRawToken = (data: BaseResData) => data.authorization || data;

/**
 * Joi validation error message transformer.
 * nested parameters are not supported yet.
 */
export const transformValidationErrors = ({ message, validation }: ValidationResData) => {
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

export const catchApiError = <V = any>({ setSubmitting, setStatus, setErrors }: FormikActions<V>) => ({ response }: AxiosError) => {
    setSubmitting(false);
    if (!response) {
        return;
    }

    const { status, data } = response as AxiosResponse<BaseResData>;

    if (status !== 400 || !data.validation) {
        setStatus(data.message);
    } else {
        setErrors(transformValidationErrors(data as ValidationResData));
    }
};
