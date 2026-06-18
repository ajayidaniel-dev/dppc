import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
} from "axios";
import { toast } from "react-hot-toast";
import { goToLogin, useAuth } from "./useAuth";

declare module "axios" {
  export interface AxiosRequestConfig {
    skipSuccessToast?: boolean;
    skipErrorToast?: boolean;
  }
}

const setupInterceptors = (inst: AxiosInstance): void => {
  inst.interceptors.response.use(
    (response: AxiosResponse) => {
      if (
        response.config.method !== "get" &&
        !response.config.skipSuccessToast
      ) {
        toast.success(
          response?.data?.data?.message ||
            response.data?.message ||
            "Operation successful"
        );
      }
      return response;
    },
    (error: AxiosError) => {
      const status = error.response?.status;
      const msg =
        (error?.response?.data as any)?.message ||
        error.message ||
        "An error occurred";
      const isAuthError =
        status === 401 || /unauthorized|token/i.test(String(msg));
      if (isAuthError && !error.config?.skipErrorToast) {
        toast.error(msg);
        goToLogin();
      } else if (!error.config?.skipErrorToast) {
        toast.error(msg);
      }
      return Promise.reject(error);
    }
  );
};

const createAxiosInstance = (
  contentType: string,
  baseURL: string,
  token?: string
): AxiosInstance => {
  const headers: Record<string, string> = { "Content-Type": contentType };
  if (token) headers.authorization = `Bearer ${token}`;
  const inst = axios.create({ headers, baseURL });
  setupInterceptors(inst);
  return inst;
};

export const useAxiosInstance = (baseURL: string) => {
  const { token } = useAuth();
  const axiosRequest = () =>
    createAxiosInstance("application/json", baseURL, token);
  const axiosRequestFormData = () =>
    createAxiosInstance("multipart/form-data", baseURL, token);
  return { axiosRequest, axiosRequestFormData };
};

export const useNoTokenAxiosInstance = (baseURL: string) => {
  const axiosRequest = () => createAxiosInstance("application/json", baseURL);
  const axiosRequestFormData = () =>
    createAxiosInstance("multipart/form-data", baseURL);
  return { axiosRequest, axiosRequestFormData };
};
