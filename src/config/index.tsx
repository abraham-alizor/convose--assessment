import axios from 'axios';
import {StatusCodes} from '@/helpers/index';

axios.defaults.timeout = 60_000;
export const apiInstance = axios.create({
  baseURL: 'https://be-v2.convose.com/',
  timeout: 60_000,
});

apiInstance.interceptors.response.use(
  async result => {
    const {response}: any = result.data;
    console.log(result.data, 'jajaja');

    return response;
  },
  async result => {
    if (result.response) {
      const error = result.response;
      console.log(error, 'jajaja   error');

      const {status, data}: any = error;

      if (status >= StatusCodes.SERVER_ERROR_HTTP_CODE) {
        const {data: errorData} = error;

        if (errorData) {
          const {response: errorResponse}: any = errorData;

          if (errorResponse) {
            throw errorResponse;
          }
        }

        const serverError =
          'ERR 015: Currently unable to process your request. Please try again';

        throw {responseMsg: serverError} as any;
      }

      const responseData: any = data?.response;
      if (!responseData) {
        const serverError =
          'Currently unable to process your request. Please try again later';

        return {responseMsg: serverError};
      }

      if (status >= 400 || status <= 499) {
        const {responseCode} = responseData;

        switch (status) {
          case StatusCodes.UNAUTHORIZED_HTTP_CODE: {
            if (responseCode === '41') {
              // Unauthorized
            } else if (responseCode === '40') {
              // Session Expired
            }

            throw responseData;
          }

          case StatusCodes.BAD_REQUEST_HTTP_CODE: {
            throw responseData;
          }

          case 417: {
            throw responseData;
          }

          default: {
            if (typeof responseData !== 'string') {
              const unhandledError =
                'Currently unable to process your request. Please try again';

              throw {responseMsg: unhandledError} as any;
            }

            throw responseData;
          }
        }
      }

      const unhandledError =
        'Currently unable to process your request. Please try again';

      throw {responseMsg: unhandledError} as any;
    }
  },
);

apiInstance.interceptors.request.use(
  async request => {
    request.headers.set('content-type', `application/json`);

    return request;
  },
  error => Promise.reject(error),
);
