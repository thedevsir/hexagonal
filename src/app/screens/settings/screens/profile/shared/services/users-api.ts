import axios, { AxiosRequestConfig } from 'axios';

export type UpdateMyAccountReqData = { username: string; email: string };

export const UsersApi = {
    updateMyAccount: (data: UpdateMyAccountReqData, config?: AxiosRequestConfig) => axios.put('/users/my', data, config),
};
