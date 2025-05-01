import { useMutation } from "@tanstack/react-query";
import { createMemeComment } from "../api";
import { useAuthToken } from "../contexts/authentication";

export function useCreateCommentMutation() {
  const token = useAuthToken();

  return useMutation({
    mutationFn: async (data: { memeId: string; content: string }) => {
      await createMemeComment(token, data.memeId, data.content);
    },
  });
}
