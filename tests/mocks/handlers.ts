import { http, HttpResponse } from "msw";

const users = {
  dummy_user_id_1: {
    id: "dummy_user_id_1",
    username: "dummy_user_1",
    pictureUrl: "https://dummy.url/1",
  },
  dummy_user_id_2: {
    id: "dummy_user_id_2",
    username: "dummy_user_2",
    pictureUrl: "https://dummy.url/2",
  },
  dummy_user_id_3: {
    id: "dummy_user_id_3",
    username: "dummy_user_3",
    pictureUrl: "https://dummy.url/3",
  },
};

const memes = [
  {
    id: "dummy_meme_id_1",
    authorId: "dummy_user_id_1",
    pictureUrl: "https://dummy.url/meme/1",
    description: "dummy meme 1",
    commentsCount: 3,
    texts: [
      { content: "dummy text 1", x: 0, y: 0 },
      { content: "dummy text 2", x: 100, y: 100 },
    ],
    createdAt: "2021-09-01T12:00:00Z",
  },
]

const comments = [
  {
    id: "dummy_comment_id_1",
    memeId: "dummy_meme_id_1",
    authorId: "dummy_user_id_1",
    content: "dummy comment 1",
    createdAt: "2021-09-01T12:00:00Z",
  },
  {
    id: "dummy_comment_id_2",
    memeId: "dummy_meme_id_1",
    authorId: "dummy_user_id_2",
    content: "dummy comment 2",
    createdAt: "2021-09-01T12:00:00Z",
  },
  {
    id: "dummy_comment_id_3",
    memeId: "dummy_meme_id_1",
    authorId: "dummy_user_id_3",
    content: "dummy comment 3",
    createdAt: "2021-09-01T12:00:00Z",
  },
]

export const handlers = [
  http.post<{}, { username: string; password: string }>(
    "https://fetestapi.int.mozzaik365.net/api/authentication/login",
    async ({ request }) => {
      const { username, password } = await request.json();
      if (username === "valid_user" && password === "password") {
        return HttpResponse.json({
          jwt: "dummy_token",
        });
      }
      if (username === "error_user") {
        return new HttpResponse(null, {
          status: 500,
        });
      }
      return new HttpResponse(null, {
        status: 401,
      });
    },
  ),
  http.get<{ id: string }>(
    "https://fetestapi.int.mozzaik365.net/api/users/:id",
    async ({ params }) => {
      const user = users[params.id as keyof typeof users];
      if (user) {
        return HttpResponse.json(user);
      }
      return new HttpResponse(null, {
        status: 404,
      });
    },
  ),
  http.get("https://fetestapi.int.mozzaik365.net/api/memes", async () => {
    return HttpResponse.json({
      total: memes.length,
      pageSize: memes.length,
      results: memes,
    });
  }),
  http.get<{ id: string }>(
    "https://fetestapi.int.mozzaik365.net/api/memes/:id/comments",
    async ({ params }) => {
      const memeComments = comments.filter(
        (comment) => comment.memeId === params.id,
      );
      return HttpResponse.json({
        total: memeComments.length,
        pageSize: memeComments.length,
        results: memeComments,
      });
    },
  ),
];
