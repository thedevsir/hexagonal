import axios, { AxiosRequestConfig } from 'axios';

import { defaultTransformers, deepTransformUnderscoredIdToId } from 'utils';

export type FetchSessionsResData = Array<{
    id: string;
    ip: string;
    browser: string;
    os: string;
    timeCreated: string;
    lastActive: string;
}>;

export const SessionsApi = {
    deleteSession: (id: string, config?: AxiosRequestConfig) => axios.delete(`/sessions/my/${id}`, config),

    fetchSessions: (config?: AxiosRequestConfig) =>
        axios.get<FetchSessionsResData>('/sessions/my', {
            ...config,
            transformResponse: [...defaultTransformers, deepTransformUnderscoredIdToId],
        }),
};
