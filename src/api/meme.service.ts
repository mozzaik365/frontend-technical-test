import { MemeCardCommentType, MemeCardType } from "../common/types/meme";
import { getUserById, getMemeComments, getMemes } from "./api";
import { MemeResult } from "./types";

// Fetch comments on click.
export async function fetchComments(
  token: string,
  memeId: string,
  page: number
) {
  const commentPage = await getMemeComments(token, memeId, page);

  // Deals with concurrent calls while addind the author to all comments
  const promiseMeComments = commentPage.results.map(async (comment) => {
    const author = await getUserById(token, comment.authorId);
    return { ...comment, author };
  });
  const commentsWithAuthor: MemeCardCommentType[] =
    await Promise.all(promiseMeComments);

  return { ...commentPage, results: commentsWithAuthor };
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

export async function getMemesService(token: string, page: number = 1) {
  const memePage = await getMemes(token, page);

  // Deals with concurrent calls while addind the author to all memes
  const promiseMeMemes = memePage.results.map((meme) =>
    completeMemeData(token, meme)
  );
  const memesWithAuthorAndComments: MemeCardType[] =
    await Promise.all(promiseMeMemes);

  memePage.results.push(...memesWithAuthorAndComments);

  return { ...memePage, results: memesWithAuthorAndComments };
}
