import axios, { AxiosRequestConfig } from 'axios';

import { transformResponseToRawToken, defaultTransformers } from 'utils';

export type LoginReqData = { usernameOrEmail: string; password: string };
export type RegisterReqData = { name: string; username: string; email: string; password: string };
export type ForgotPasswordReqData = { email: string };
export type ResendEmailReqData = ForgotPasswordReqData;
export type ResetPasswordReqData = { key: string; password: string };
export type VerifyReqData = { key: string };

export const AuthApi = {
    forgotPassword: (data: ForgotPasswordReqData, config?: AxiosRequestConfig) => axios.post('/login/forgot', data, config),

    login: (data: LoginReqData, config?: AxiosRequestConfig) =>
        axios.post<string>('/login', data, {
            ...config,
            transformResponse: [...defaultTransformers, transformResponseToRawToken],
        }),

    logout: (config?: AxiosRequestConfig) => axios.delete('/logout', config),

    register: (data: RegisterReqData, config?: AxiosRequestConfig) =>
        axios.post<string>('/signup', data, { ...config, transformResponse: [...defaultTransformers, transformResponseToRawToken] }),

    resendEmail: (data: ResendEmailReqData, config?: AxiosRequestConfig) => axios.post('/signup/resend-email', data, config),

    resetPassword: (data: ResetPasswordReqData, config?: AxiosRequestConfig) => axios.post('/login/reset', data, config),

    verify: (data: VerifyReqData, config?: AxiosRequestConfig) => axios.post('/signup/verify', data, config),
};
