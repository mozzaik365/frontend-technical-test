import { axiosClient } from "../axios-client";
import * as z from "zod";

const textSchema = z.object({
  content: z.string(),
  x: z.number(),
  y: z.number(),
});

export type Text = z.infer<typeof textSchema>;

const memeSchema = z.object({
  id: z.string(),
  authorId: z.string(),
  pictureUrl: z.string(),
  description: z.string(),
  commentsCount: z.number(),
  createdAt: z.string(),
  texts: z.array(textSchema),
});

export type Meme = z.infer<typeof memeSchema>;

const schema = z.object({
  results: z.array(memeSchema),
  total: z.number(),
  pageSize: z.number(),
});

export type GetMemePageResponse = z.infer<typeof schema>;

export async function getMemes(page: number) {
  const result = await axiosClient.get(`/memes?page=${page}`);
  return schema.parse(result.data);
}
