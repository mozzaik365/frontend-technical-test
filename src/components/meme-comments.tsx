import { useState } from "react";
import { useCommentsQuery } from "../queries/useCommentsQuery";
import { Loader } from "./loader";
import {
  Box,
  Collapse,
  Flex,
  Icon,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CaretUp, CaretDown, Chat } from "@phosphor-icons/react";

import { Comment } from "./meme-comment";
import { CommentForm } from "./meme-comment-form";

export function Comments({
  memeId,
  commentsCount,
}: {
  memeId: string;
  commentsCount: string;
}) {
  const [isSectionOpened, setSectionOpened] = useState(false);

  const { status, data, refetch } = useCommentsQuery(memeId, 1);

  console.log("<Comments />", { data, status });
  if (status === "pending") return <Loader />;

  if (status === "error") return <Text>Cannot retrieve comments</Text>;

  return (
    <>
      <LinkBox as={Box} py={2} borderBottom="1px solid black">
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <LinkOverlay
              data-testid={`meme-comments-section-${memeId}`}
              cursor="pointer"
              onClick={() => setSectionOpened((prev) => !prev)}
            >
              <Text data-testid={`meme-comments-count-${memeId}`}>
                {commentsCount} comments
              </Text>
            </LinkOverlay>
            <Icon as={isSectionOpened ? CaretUp : CaretDown} ml={2} mt={1} />
          </Flex>
          <Icon as={Chat} />
        </Flex>
      </LinkBox>
      <Collapse in={isSectionOpened} animateOpacity>
        <CommentForm memeId={memeId} onCommentCreated={() => refetch()} />
        <VStack align="stretch" spacing={4}>
          {data.results.map((comment) => (
            <Comment
              memeId={memeId}
              content={comment.content}
              id={comment.id}
              createdAt={comment.createdAt}
            />
          ))}
        </VStack>
      </Collapse>
    </>
  );
}
