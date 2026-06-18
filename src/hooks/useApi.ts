import {
  useQuery,
  useMutation,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";
import { AxiosError, type AxiosResponse } from "axios";
import {
  useAxiosInstance,
  useNoTokenAxiosInstance,
} from "../utils/serverRequest";

type InvalidateOption = string[] | string;

interface MutationOptions<TData, TVariables> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: AxiosError, variables: TVariables) => void;
  onSettled?: (
    data: TData | undefined,
    error: AxiosError | null,
    variables: TVariables
  ) => void;
  invalidateQueries?: InvalidateOption;
}

const invalidate = (
  qc: ReturnType<typeof useQueryClient>,
  queries?: InvalidateOption
) => {
  if (!queries) return;
  (Array.isArray(queries) ? queries : [queries]).forEach((key) =>
    qc.invalidateQueries({ queryKey: [key] })
  );
};

/**
 * GET via React Query. Defaults: 5min staleTime, 10min gcTime, no refetch on
 * window focus, retry 3.
 */
export const useGet = <TData = any>(
  baseURL: string,
  queryKey: QueryKey,
  url: string,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    retry?: boolean | number;
  },
  noToken = false
) => {
  const tokened = useAxiosInstance(baseURL);
  const tokenless = useNoTokenAxiosInstance(baseURL);
  const { axiosRequest } = noToken ? tokenless : tokened;
  return useQuery<TData, AxiosError>({
    queryKey,
    queryFn: async () => {
      const res: AxiosResponse<TData> = await axiosRequest().get(url);
      return res.data;
    },
    enabled: options?.enabled ?? true,
    staleTime: options?.staleTime ?? 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: options?.retry ?? 3,
  });
};

/**
 * Imperative GET. Returns a `fetchData(url)` to trigger requests on demand.
 */
export const useLazyGet = <TData = any>(baseURL: string, noToken = false) => {
  const tokened = useAxiosInstance(baseURL);
  const tokenless = useNoTokenAxiosInstance(baseURL);
  const { axiosRequest } = noToken ? tokenless : tokened;
  const fetchData = async (url: string): Promise<TData> => {
    const res: AxiosResponse<TData> = await axiosRequest().get(url);
    return res.data;
  };
  return { fetchData };
};

/**
 * GET whose cache key carries the URL, e.g. queryKey: [key, url].
 */
export const useGetWithParams = <TData = any>(
  baseURL: string,
  key: string,
  url: string,
  options?: { enabled?: boolean; staleTime?: number },
  noToken = false
) => useGet<TData>(baseURL, [key, url], url, options, noToken);

export const usePost = <TData = any, TVariables = any>(
  baseURL: string,
  url: string,
  options?: MutationOptions<TData, TVariables>
) => {
  const { axiosRequest } = useAxiosInstance(baseURL);
  const qc = useQueryClient();
  return useMutation<TData, AxiosError, TVariables>({
    mutationFn: async (data) => (await axiosRequest().post(url, data)).data,
    onSuccess: (data, variables) => {
      invalidate(qc, options?.invalidateQueries);
      options?.onSuccess?.(data, variables);
    },
    onError: options?.onError,
    onSettled: options?.onSettled,
  });
};

export const usePostFormData = <TData = any, TVariables = FormData>(
  baseURL: string,
  url: string,
  options?: MutationOptions<TData, TVariables>
) => {
  const { axiosRequestFormData } = useAxiosInstance(baseURL);
  const qc = useQueryClient();
  return useMutation<TData, AxiosError, TVariables>({
    mutationFn: async (data) =>
      (await axiosRequestFormData().post(url, data)).data,
    onSuccess: (data, variables) => {
      invalidate(qc, options?.invalidateQueries);
      options?.onSuccess?.(data, variables);
    },
    onError: options?.onError,
    onSettled: options?.onSettled,
  });
};

export const usePut = <TData = any, TVariables = any>(
  baseURL: string,
  url: string,
  options?: MutationOptions<TData, TVariables>
) => {
  const { axiosRequest } = useAxiosInstance(baseURL);
  const qc = useQueryClient();
  return useMutation<TData, AxiosError, TVariables>({
    mutationFn: async (data) => (await axiosRequest().put(url, data)).data,
    onSuccess: (data, variables) => {
      invalidate(qc, options?.invalidateQueries);
      options?.onSuccess?.(data, variables);
    },
    onError: options?.onError,
    onSettled: options?.onSettled,
  });
};

export const usePatch = <TData = any, TVariables = any>(
  baseURL: string,
  url: string,
  options?: MutationOptions<TData, TVariables>
) => {
  const { axiosRequest } = useAxiosInstance(baseURL);
  const qc = useQueryClient();
  return useMutation<TData, AxiosError, TVariables>({
    mutationFn: async (data) => (await axiosRequest().patch(url, data)).data,
    onSuccess: (data, variables) => {
      invalidate(qc, options?.invalidateQueries);
      options?.onSuccess?.(data, variables);
    },
    onError: options?.onError,
    onSettled: options?.onSettled,
  });
};

export const useDelete = <TData = any, TVariables = any>(
  baseURL: string,
  url: string,
  options?: MutationOptions<TData, TVariables>
) => {
  const { axiosRequest } = useAxiosInstance(baseURL);
  const qc = useQueryClient();
  return useMutation<TData, AxiosError, TVariables>({
    mutationFn: async () => (await axiosRequest().delete(url)).data,
    onSuccess: (data, variables) => {
      invalidate(qc, options?.invalidateQueries);
      options?.onSuccess?.(data, variables);
    },
    onError: options?.onError,
    onSettled: options?.onSettled,
  });
};

type HttpMethod = "post" | "put" | "patch" | "delete";

/**
 * Mutation with a dynamic method and a URL built per-variables, useful for
 * path params: urlBuilder(variables) => `/items/${variables.id}`.
 */
export const useMutateWithParams = <TData = any, TVariables = any>(
  baseURL: string,
  method: HttpMethod,
  urlBuilder: (variables: TVariables) => string,
  options?: MutationOptions<TData, TVariables>
) => {
  const { axiosRequest } = useAxiosInstance(baseURL);
  const qc = useQueryClient();
  return useMutation<TData, AxiosError, TVariables>({
    mutationFn: async (variables) => {
      const url = urlBuilder(variables);
      const client = axiosRequest();
      if (method === "delete") return (await client.delete(url)).data;
      return (await client[method](url, variables)).data;
    },
    onSuccess: (data, variables) => {
      invalidate(qc, options?.invalidateQueries);
      options?.onSuccess?.(data, variables);
    },
    onError: options?.onError,
    onSettled: options?.onSettled,
  });
};
