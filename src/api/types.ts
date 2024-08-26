export type LoginResponse = {
  jwt: string;
};

export type GetUserByIdResponse = {
  id: string;
  username: string;
  pictureUrl: string;
};

export type GetMemesResponse = {
  total: number;
  pageSize: number;
  results: {
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
    createdAt: string;
  }[];
};

export type MemeCommentResult = {
  id: string;
  authorId: string;
  memeId: string;
  content: string;
  createdAt: string;
};

export type GetMemeCommentsResponse = {
  total: number;
  pageSize: number;
  results: MemeCommentResult[];
};

export type CreateCommentResponse = {
  id: string;
  content: string;
  createdAt: string;
  authorId: string;
  memeId: string;
};
