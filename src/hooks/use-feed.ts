import { useAuthToken } from "../contexts/authentication";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getMemes } from "../api";
import { PaginationResponse } from "../types/pagination-response";
import { Meme } from "../types/meme";

function getNextPageParam(
  lastPage: PaginationResponse<Meme>,
  pages: PaginationResponse<Meme>[]
) {
  const totalPages = Math.ceil(lastPage.total / lastPage.pageSize);
  return pages.length + 1 <= totalPages ? pages.length + 1 : undefined;
}

export function useFeed() {
  const token = useAuthToken();

  const { fetchNextPage, data, hasNextPage } = useInfiniteQuery({
    queryKey: ["memes"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getMemes(token, pageParam),
    getNextPageParam,
  });

  return {
    hasNextPage,
    feed: data,
    fetchNextPage,
  };
}
