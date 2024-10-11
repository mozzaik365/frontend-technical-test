import { axiosClient } from "../axios-client";
import * as z from "zod";

const memeCommentSchema = z.object({
  id: z.string(),
  authorId: z.string(),
  memeId: z.string(),
  content: z.string(),
  createdAt: z.string(),
});

export type MemeComment = z.infer<typeof memeCommentSchema>;

const schema = z.object({
  results: z.array(memeCommentSchema),
  total: z.number(),
  pageSize: z.number(),
});

export type GetMemeCommentsResponse = z.infer<typeof schema>;

export async function getMemeComments(memeId: string, page: number) {
  const result = await axiosClient.get(
    `/memes/${memeId}/comments?page=${page}`
  );
  return schema.parse(result.data);
}

export async function createMemeComment(memeId: string, content: string) {
  const result = await axiosClient.post(`/memes/${memeId}/comments`, {
    content,
  });
  return memeCommentSchema.parse(result.data);
}
