import { GetUserByIdResponse, MemeCommentResult } from "../../api/types";

// Types defined by API calls
export type MemeCardAuthorType = GetUserByIdResponse;
export type MemeCardCommentType = MemeCommentResult & {
  author: MemeCardAuthorType;
};

// Type for the business logic of the Meme Card
export type MemeCardType = {
  id: string;
  authorId: string;
  pictureUrl: string;
  description: string;
  commentsCount: string;
  texts: {
    content: string;
    x: number;
    y: number;
  }[];
  author: MemeCardAuthorType;
  comments?: MemeCardCommentType[];
  createdAt: string;
};
