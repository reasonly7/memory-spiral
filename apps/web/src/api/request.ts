import axios, { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { message as antdMessage } from "ant-design-vue";
import { router } from "@/router";

export interface ResponseData<T> {
  data: T;
  code: number;
  success: boolean;
  message: string | null;
}

const request = axios.create({
  baseURL: "/api/rest/v1",
});

request.interceptors.request.use((request) => {
  if (localStorage.accessToken) {
    request.headers.Authorization = `Bearer ${localStorage.accessToken}`;
  }

  return request;
});

const message = {
  success: (msg: string) => {
    antdMessage.success(msg);
  },
  error: (msg: string) => {
    antdMessage.error(msg);
  },
};

const serverCodeMessageMap: Record<number, string> = {};
const httpCodeMessgeMap: Record<number, string> = {};

request.interceptors.response.use(
  (response: AxiosResponse<ResponseData<any>>) => {
    if (response.config.responseType === "blob") {
      return response.data;
    }
    const { message: msg, code } = response.data as ResponseData<unknown>;
    if (code >= 200 && code < 300) {
      msg && message.success(msg);
    } else {
      message.error(serverCodeMessageMap[code]);
    }

    return response.data.data;
  },

  (error: AxiosError<ResponseData<unknown>>) => {
    if (!error.isAxiosError || !error.response) {
      return Promise.resolve();
    }

    const { status, statusText, data } = error.response;

    if (!data) {
      message.error(httpCodeMessgeMap[status] || `${status} ${statusText}`);
      return Promise.resolve();
    }

    const { message: serverMessage, code } = data;
    const tip = () =>
      message.error(
        serverCodeMessageMap[code] || serverMessage || "Unknown Server Error."
      );

    switch (status) {
      case HttpStatusCode.Unauthorized:
        delete localStorage.accessToken;
        router.replace("/login");
        tip();
        break;
      default:
        tip();
    }
    return Promise.resolve();
  }
);

export function get<T>(...params: Parameters<typeof request.get>) {
  return request.get.call(null, ...params) as Promise<T | undefined>;
}

export function post<T>(...params: Parameters<typeof request.post>) {
  return request.post.call(null, ...params) as Promise<T | undefined>;
}

export function patch<T>(...params: Parameters<typeof request.patch>) {
  return request.patch.call(null, ...params) as Promise<T | undefined>;
}

export function put<T>(...params: Parameters<typeof request.put>) {
  return request.put.call(null, ...params) as Promise<T | undefined>;
}

export function del<T>(...params: Parameters<typeof request.delete>) {
  return request.delete.call(null, ...params) as Promise<T | undefined>;
}
