import { useCallback, useState } from "react";
import { useAuthToken } from "../contexts/authentication";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { getMemes, GetMemesResponse } from "../api";

function getNextPageParam(
  lastPage: GetMemesResponse,
  pages: GetMemesResponse[]
) {
  const totalPages = Math.ceil(lastPage.total / lastPage.pageSize);
  return pages.length + 1 <= totalPages ? pages.length + 1 : undefined;
}

export function useFeed() {
  const token = useAuthToken();

  const { fetchNextPage, data, isFetching, hasNextPage } = useInfiniteQuery({
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
