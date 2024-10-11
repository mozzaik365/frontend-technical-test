import { useInfiniteQuery } from "@tanstack/react-query";
import { getNextPageParam } from "../utils/get-next-page-param";
import { getMemes } from "../services/api";

export function useFeed() {
  return useInfiniteQuery({
    queryKey: ["memes"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getMemes(pageParam),
    getNextPageParam,
  });
}
