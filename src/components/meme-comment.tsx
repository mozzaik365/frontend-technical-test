import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { format } from "timeago.js";
import { useUserQuery } from "../queries/useUserQuery";
import { Loader } from "./loader";

export function Comment({
  id,
  memeId,
  content,
  createdAt,
}: {
  id: string;
  memeId: string;
  createdAt: string;
  content: string;
}) {
  const { status, data: author } = useUserQuery(id);

  return (
    <Flex key={id}>
      {status === "error" ? (
        <Text>cannot retrieve author</Text>
      ) : status === "pending" ? (
        <Loader />
      ) : (
        <Avatar
          borderWidth="1px"
          borderColor="gray.300"
          size="sm"
          name={author.username}
          src={author.pictureUrl}
          mr={2}
        />
      )}
      <Box p={2} borderRadius={8} bg="gray.50" flexGrow={1}>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex>
            <Text data-testid={`meme-comment-author-${memeId}-${id}`}>
              {status === "error"
                ? "cannot retrieve author"
                : status === "pending"
                  ? "loading..."
                  : author.username}
            </Text>
          </Flex>
          <Text fontStyle="italic" color="gray.500" fontSize="small">
            {format(createdAt)}
          </Text>
        </Flex>
        <Text
          color="gray.500"
          whiteSpace="pre-line"
          data-testid={`meme-comment-content-${memeId}-${id}`}
        >
          {content}
        </Text>
      </Box>
    </Flex>
  );
}
