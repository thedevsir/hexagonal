import { AxiosResponse } from 'axios';

export const transformResponseToRawToken = (response: AxiosResponse): string => response.data.authorization;
