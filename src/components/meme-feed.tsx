import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Flex, StackDivider, VStack } from "@chakra-ui/react";

import { getMemeComments, getMemes, getUserById } from "../api/api";
import { useAuthToken } from "../contexts/authentication";
import { Loader } from "./loader";

import MemeCard from "./meme-card/meme-card";
import { GetMemeCommentsResponse, GetMemesResponse } from "../api/types";
import { MemeCardCommentType, MemeCardType } from "../common/types/meme";

interface MemeFeedProps {}

const MemeFeed: React.FC<MemeFeedProps> = () => {
  const token = useAuthToken();
  const { isLoading, data: memes } = useQuery({
    queryKey: ["memes"],
    queryFn: async () => {
      // Don't we need total and pageSize? Maybe for pagination?
      const memes: GetMemesResponse["results"] = [];

      const firstPage = await getMemes(token, 1);

      memes.push(...firstPage.results);

      // Add a pagination later
      /* const remainingPages =
        Math.ceil(firstPage.total / firstPage.pageSize) - 1;
      for (let i = 0; i < remainingPages; i++) {
        const page = await getMemes(token, i + 2);
        memes.push(...page.results);
      } */

      const memesWithAuthorAndComments: MemeCardType[] = [];

      // This needs to be fixed with promises and async / await
      for (const meme of memes) {
        const author = await getUserById(token, meme.authorId);

        // Check commentsCount before asking for comments and avoid extra calls
        const comments: GetMemeCommentsResponse["results"] = [];
        const firstPage = await getMemeComments(token, meme.id, 1);
        comments.push(...firstPage.results);

        const remainingCommentPages =
          Math.ceil(firstPage.total / firstPage.pageSize) - 1;

        for (let i = 0; i < remainingCommentPages; i++) {
          const page = await getMemeComments(token, meme.id, i + 2);
          comments.push(...page.results);
        }

        const commentsWithAuthor: MemeCardCommentType[] = [];
        for (const comment of comments) {
          const author = await getUserById(token, comment.authorId);
          commentsWithAuthor.push({ ...comment, author });
        }

        memesWithAuthorAndComments.push({
          ...meme,
          author,
          comments: commentsWithAuthor,
        });
      }

      return memesWithAuthorAndComments;
    },
  });

  if (isLoading) {
    return <Loader data-testid="meme-feed-loader" />;
  }
  return (
    <Flex width="full" height="full" justifyContent="center" overflowY="auto">
      <VStack
        p={4}
        width="full"
        maxWidth={800}
        divider={<StackDivider border="gray.200" />}
      >
        {memes?.map((meme) => {
          return <MemeCard meme={meme} />;
        })}
      </VStack>
    </Flex>
  );
};

export default MemeFeed;
