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

const createMemeParamSchema = z.object({
  picture: z.instanceof(File),
  description: z.string(),
  texts: z.array(textSchema),
});

export type CreateMemeParam = z.infer<typeof createMemeParamSchema>;

export async function createMeme(data: CreateMemeParam) {
  const parsed = createMemeParamSchema.parse(data);
  const formData = new FormData();
  formData.append("Picture", parsed.picture);
  formData.append("Description", parsed.description);
  parsed.texts.forEach((text, index) => {
    formData.append(`Texts[${index}][Content]`, text.content);
    formData.append(`Texts[${index}][X]`, Math.floor(text.x).toString());
    formData.append(`Texts[${index}][Y]`, Math.floor(text.y).toString());
  });

  const result = await axiosClient.post("/memes", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return memeSchema.parse(result.data);
}
