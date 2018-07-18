import axios, { AxiosRequestConfig } from 'axios';

export type UpdateMyAccountReqData = { username: string; email: string };
export type UpdateMyPasswordReqData = { password: string };

export const UsersApi = {
    updateMyAccount: (data: UpdateMyAccountReqData, config?: AxiosRequestConfig) => axios.put('/users/my', data, config),

    updateMyPassword: (data: UpdateMyPasswordReqData, config?: AxiosRequestConfig) => axios.put('/users/my/password', data, config),

    uploadAvatar: (avatar: File, config?: AxiosRequestConfig) => {
        const formData = new FormData();
        formData.append('avatar', avatar);

        return axios.put('/accounts/my/avatar', formData, config);
    },
};
