export type PaginationResponse<T> = {
  total: number;
  pageSize: number;
  results: T[];
};
