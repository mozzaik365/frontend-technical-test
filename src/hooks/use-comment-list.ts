import { useInfiniteQuery } from "@tanstack/react-query";
import { getNextPageParam } from "../utils/get-next-page-param";
import { getMemeComments } from "../services/api";

export function useCommentList(memeId: string) {
  return useInfiniteQuery({
    queryKey: ["comments", memeId],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getMemeComments(memeId, pageParam),
    getNextPageParam,
  });
}
