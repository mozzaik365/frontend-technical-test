import { PaginationResponse } from "../types/pagination-response";

export function getNextPageParam<T>(
  lastPage: PaginationResponse<T>,
  pages: PaginationResponse<T>[]
) {
  const totalPages = Math.ceil(lastPage.total / lastPage.pageSize);
  return pages.length + 1 <= totalPages ? pages.length + 1 : undefined;
}
