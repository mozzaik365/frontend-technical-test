import { useAuthToken } from "../contexts/authentication";
import { getMemeComments } from "../api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getNextPageParam } from "../utils/get-next-page-param";

export function useCommentList(memeId: string) {
  const token = useAuthToken();
  return useInfiniteQuery({
    queryKey: ["comments", memeId],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getMemeComments(token, memeId, pageParam),
    getNextPageParam,
  });
}
