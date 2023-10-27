/**
 * Generated by orval v6.18.1 🍺
 * Do not edit manually.
 * DOCUMENTATION
 * OpenAPI spec version: 1.0.0
 */
import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
  QueryFunction,
  MutationFunction,
  UseQueryResult,
  QueryKey,
} from '@tanstack/react-query';
import type {
  ProjectCategoryListResponse,
  Error,
  GetProjectCategoriesParams,
  ProjectCategoryResponse,
  ProjectCategoryRequest,
  GetProjectCategoriesIdParams,
} from './strapi.schemas';
import { API } from '../../services/api/index';
import type { ErrorType } from '../../services/api/index';

// eslint-disable-next-line
type SecondParameter<T extends (...args: any) => any> = T extends (
  config: any,
  args: infer P
) => any
  ? P
  : never;

export const getProjectCategories = (
  params?: GetProjectCategoriesParams,
  options?: SecondParameter<typeof API>,
  signal?: AbortSignal
) => {
  return API<ProjectCategoryListResponse>(
    { url: `/project-categories`, method: 'get', params, signal },
    options
  );
};

export const getGetProjectCategoriesQueryKey = (params?: GetProjectCategoriesParams) => {
  return [`/project-categories`, ...(params ? [params] : [])] as const;
};

export const getGetProjectCategoriesQueryOptions = <
  TData = Awaited<ReturnType<typeof getProjectCategories>>,
  TError = ErrorType<Error>
>(
  params?: GetProjectCategoriesParams,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProjectCategories>>, TError, TData>;
    request?: SecondParameter<typeof API>;
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetProjectCategoriesQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getProjectCategories>>> = ({ signal }) =>
    getProjectCategories(params, requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getProjectCategories>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type GetProjectCategoriesQueryResult = NonNullable<
  Awaited<ReturnType<typeof getProjectCategories>>
>;
export type GetProjectCategoriesQueryError = ErrorType<Error>;

export const useGetProjectCategories = <
  TData = Awaited<ReturnType<typeof getProjectCategories>>,
  TError = ErrorType<Error>
>(
  params?: GetProjectCategoriesParams,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProjectCategories>>, TError, TData>;
    request?: SecondParameter<typeof API>;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetProjectCategoriesQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const postProjectCategories = (
  projectCategoryRequest: ProjectCategoryRequest,
  options?: SecondParameter<typeof API>
) => {
  return API<ProjectCategoryResponse>(
    {
      url: `/project-categories`,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: projectCategoryRequest,
    },
    options
  );
};

export const getPostProjectCategoriesMutationOptions = <
  TError = ErrorType<Error>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postProjectCategories>>,
    TError,
    { data: ProjectCategoryRequest },
    TContext
  >;
  request?: SecondParameter<typeof API>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof postProjectCategories>>,
  TError,
  { data: ProjectCategoryRequest },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postProjectCategories>>,
    { data: ProjectCategoryRequest }
  > = (props) => {
    const { data } = props ?? {};

    return postProjectCategories(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PostProjectCategoriesMutationResult = NonNullable<
  Awaited<ReturnType<typeof postProjectCategories>>
>;
export type PostProjectCategoriesMutationBody = ProjectCategoryRequest;
export type PostProjectCategoriesMutationError = ErrorType<Error>;

export const usePostProjectCategories = <TError = ErrorType<Error>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postProjectCategories>>,
    TError,
    { data: ProjectCategoryRequest },
    TContext
  >;
  request?: SecondParameter<typeof API>;
}) => {
  const mutationOptions = getPostProjectCategoriesMutationOptions(options);

  return useMutation(mutationOptions);
};
export const getProjectCategoriesId = (
  id: number,
  params?: GetProjectCategoriesIdParams,
  options?: SecondParameter<typeof API>,
  signal?: AbortSignal
) => {
  return API<ProjectCategoryResponse>(
    { url: `/project-categories/${id}`, method: 'get', params, signal },
    options
  );
};

export const getGetProjectCategoriesIdQueryKey = (
  id: number,
  params?: GetProjectCategoriesIdParams
) => {
  return [`/project-categories/${id}`, ...(params ? [params] : [])] as const;
};

export const getGetProjectCategoriesIdQueryOptions = <
  TData = Awaited<ReturnType<typeof getProjectCategoriesId>>,
  TError = ErrorType<Error>
>(
  id: number,
  params?: GetProjectCategoriesIdParams,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProjectCategoriesId>>, TError, TData>;
    request?: SecondParameter<typeof API>;
  }
) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetProjectCategoriesIdQueryKey(id, params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getProjectCategoriesId>>> = ({ signal }) =>
    getProjectCategoriesId(id, params, requestOptions, signal);

  return { queryKey, queryFn, enabled: !!id, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getProjectCategoriesId>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type GetProjectCategoriesIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getProjectCategoriesId>>
>;
export type GetProjectCategoriesIdQueryError = ErrorType<Error>;

export const useGetProjectCategoriesId = <
  TData = Awaited<ReturnType<typeof getProjectCategoriesId>>,
  TError = ErrorType<Error>
>(
  id: number,
  params?: GetProjectCategoriesIdParams,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProjectCategoriesId>>, TError, TData>;
    request?: SecondParameter<typeof API>;
  }
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetProjectCategoriesIdQueryOptions(id, params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const putProjectCategoriesId = (
  id: number,
  projectCategoryRequest: ProjectCategoryRequest,
  options?: SecondParameter<typeof API>
) => {
  return API<ProjectCategoryResponse>(
    {
      url: `/project-categories/${id}`,
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      data: projectCategoryRequest,
    },
    options
  );
};

export const getPutProjectCategoriesIdMutationOptions = <
  TError = ErrorType<Error>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putProjectCategoriesId>>,
    TError,
    { id: number; data: ProjectCategoryRequest },
    TContext
  >;
  request?: SecondParameter<typeof API>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof putProjectCategoriesId>>,
  TError,
  { id: number; data: ProjectCategoryRequest },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof putProjectCategoriesId>>,
    { id: number; data: ProjectCategoryRequest }
  > = (props) => {
    const { id, data } = props ?? {};

    return putProjectCategoriesId(id, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type PutProjectCategoriesIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof putProjectCategoriesId>>
>;
export type PutProjectCategoriesIdMutationBody = ProjectCategoryRequest;
export type PutProjectCategoriesIdMutationError = ErrorType<Error>;

export const usePutProjectCategoriesId = <TError = ErrorType<Error>, TContext = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof putProjectCategoriesId>>,
    TError,
    { id: number; data: ProjectCategoryRequest },
    TContext
  >;
  request?: SecondParameter<typeof API>;
}) => {
  const mutationOptions = getPutProjectCategoriesIdMutationOptions(options);

  return useMutation(mutationOptions);
};
export const deleteProjectCategoriesId = (id: number, options?: SecondParameter<typeof API>) => {
  return API<number>({ url: `/project-categories/${id}`, method: 'delete' }, options);
};

export const getDeleteProjectCategoriesIdMutationOptions = <
  TError = ErrorType<Error>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteProjectCategoriesId>>,
    TError,
    { id: number },
    TContext
  >;
  request?: SecondParameter<typeof API>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof deleteProjectCategoriesId>>,
  TError,
  { id: number },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteProjectCategoriesId>>,
    { id: number }
  > = (props) => {
    const { id } = props ?? {};

    return deleteProjectCategoriesId(id, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type DeleteProjectCategoriesIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteProjectCategoriesId>>
>;

export type DeleteProjectCategoriesIdMutationError = ErrorType<Error>;

export const useDeleteProjectCategoriesId = <
  TError = ErrorType<Error>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteProjectCategoriesId>>,
    TError,
    { id: number },
    TContext
  >;
  request?: SecondParameter<typeof API>;
}) => {
  const mutationOptions = getDeleteProjectCategoriesIdMutationOptions(options);

  return useMutation(mutationOptions);
};