import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

import env from '@/env.mjs';

export const AXIOS_INSTANCE: AxiosInstance = Axios.create({ baseURL: env.NEXT_PUBLIC_API_URL });

export const API = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise: Promise<T> = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(({ data }) => data);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>;

export default API;
