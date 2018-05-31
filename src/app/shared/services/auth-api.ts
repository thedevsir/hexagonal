import axios from 'axios';

import { transformResponseToRawToken } from 'utils';

export type LoginReqData = { usernameOrEmail: string; password: string };
export type RegisterReqData = { name: string; username: string; email: string; password: string };
export type ForgotPasswordReqData = { email: string };
export type ResendEmailReqData = ForgotPasswordReqData;
export type ResetPasswordReqData = { email: string; key: string; password: string };
export type VerifyReqData = { email: string; key: string };

export const AuthApi = {
    forgotPassword: (data: ForgotPasswordReqData) => axios.post('/login/forgot', data),
    login: async (data: LoginReqData) => transformResponseToRawToken(await axios.post('/login', data)),
    logout: () => axios.delete('/logout'),
    register: async (data: RegisterReqData) => transformResponseToRawToken(await axios.post('/signup', data)),
    resendEmail: (data: ResendEmailReqData) => axios.post('/signup/resend-email', data),
    resetPassword: (data: ResetPasswordReqData) => axios.post('/login/reset', data),
    verify: (data: VerifyReqData) => axios.post('/signup/verify', data),
};
