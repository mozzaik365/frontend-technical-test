import { useMutation } from "@tanstack/react-query";
import { createMeme, CreateMemeParam } from "../services/api";

export function useSubmitMeme() {
  return useMutation({
    mutationFn: async (data: CreateMemeParam) => {
      return await createMeme(data);
    },
  });
}
