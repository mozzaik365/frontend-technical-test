import { MemeCardCommentType, MemeCardType } from "../common/types/meme";
import { getUserById, getMemeComments, getMemes } from "./api";
import { MemeCommentResult, MemeResult } from "./types";

// Fetch comments on click.
export async function fetchComments(token: string, memeId: string) {
  const comments: MemeCommentResult[] = [];
  const firstPage = await getMemeComments(token, memeId, 1);
  comments.push(...firstPage.results);

  // Needs pagination and optimisation.
  const remainingCommentPages =
    Math.ceil(firstPage.total / firstPage.pageSize) - 1;

  for (let i = 0; i < remainingCommentPages; i++) {
    const page = await getMemeComments(token, memeId, i + 2);
    comments.push(...page.results);
  }

  const promiseMeComments = comments.map(async (comment) => {
    const author = await getUserById(token, comment.authorId);
    return { ...comment, author };
  });

  const commentsWithAuthor: MemeCardCommentType[] =
    await Promise.all(promiseMeComments);

  return commentsWithAuthor;
}

async function completeMemeData(token: string, meme: MemeResult) {
  // Author of the meme
  const author = await getUserById(token, meme.authorId);

  return {
    ...meme,
    author,
    comments: [],
  };
}

export async function getMemesService(token: string) {
  // Function in meme.service

  // Don't we need total and pageSize? Maybe for pagination?
  // For the moment I leave this as it is.
  const memes: MemeResult[] = [];

  const firstPage = await getMemes(token, 1);

  memes.push(...firstPage.results);

  // Add a pagination later
  /* const remainingPages =
        Math.ceil(firstPage.total / firstPage.pageSize) - 1;
      for (let i = 0; i < remainingPages; i++) {
        const page = await getMemes(token, i + 2);
        memes.push(...page.results);
      } */

  const promiseMeMemes = memes.map((meme) => completeMemeData(token, meme));

  const memesWithAuthorAndComments: MemeCardType[] =
    await Promise.all(promiseMeMemes);

  return memesWithAuthorAndComments;
}
