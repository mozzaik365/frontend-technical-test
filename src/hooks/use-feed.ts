import { useAuthToken } from "../contexts/authentication";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getMemes } from "../api";
import { getNextPageParam } from "../utils/get-next-page-param";

export function useFeed() {
  const token = useAuthToken();

  return useInfiniteQuery({
    queryKey: ["memes"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getMemes(token, pageParam),
    getNextPageParam,
  });
}
