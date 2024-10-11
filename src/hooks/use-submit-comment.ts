import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMemeComment, GetMemePageResponse } from "../services/api";

type InfiniteData = {
  pages: GetMemePageResponse[];
  pageParams: unknown;
};

function incrementeCommentCount(data: InfiniteData, memeId: string) {
  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      results: page.results.map((meme) =>
        meme.id === memeId
          ? { ...meme, commentsCount: meme.commentsCount + 1 }
          : meme
      ),
    })),
  };
}

export function useSubmitComment(memeId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { content: string }) => {
      await createMemeComment(memeId, data.content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", memeId] });
      queryClient.setQueryData<InfiniteData>(["memes"], (data) => {
        if (!data) return data;
        return incrementeCommentCount(data, memeId);
      });
    },
  });
}
