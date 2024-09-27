import { MemeText } from "./meme-text";

export type Meme = {
  id: string;
  authorId: string;
  pictureUrl: string;
  description: string;
  commentsCount: number;
  texts: MemeText[];
  createdAt: string;
};
