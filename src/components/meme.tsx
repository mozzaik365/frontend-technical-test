import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { format } from "timeago.js";
import { MemePicture } from "./meme-picture";
import { GetMemesResponse } from "../api";
import { useUserQuery } from "../queries/useUserQuery";
import { Loader } from "./loader";
import { Comments } from "./meme-comments";

type Meme = GetMemesResponse["results"][number];

type Props = Meme;

export function Meme({
  id,
  authorId,
  createdAt,
  description,
  pictureUrl,
  texts,
  commentsCount,
}: Props) {
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Flex>
          <MemeAuthor id={authorId} />
        </Flex>
        <Text fontStyle="italic" color="gray.500" fontSize="small">
          {format(createdAt)}
        </Text>
      </Flex>
      <MemePicture
        pictureUrl={pictureUrl}
        texts={texts}
        dataTestId={`meme-picture-${id}`}
      />
      <Box>
        <Text fontWeight="bold" fontSize="medium" mb={2}>
          Description:{" "}
        </Text>
        <Box p={2} borderRadius={8} border="1px solid" borderColor="gray.100">
          <Text
            color="gray.500"
            whiteSpace="pre-line"
            data-testid={`meme-description-${id}`}
          >
            {description}
          </Text>
        </Box>
      </Box>
      <Comments memeId={id} commentsCount={commentsCount} />
    </>
  );
}

function MemeAuthor({ id }: { id: string }) {
  const { status, data } = useUserQuery(id);

  if (status === "pending") return <Loader />;

  if (status === "error") return <Text>cannot retrieve author</Text>;

  return (
    <>
      <Avatar
        borderWidth="1px"
        borderColor="gray.300"
        size="xs"
        name={data.username}
        src={data.pictureUrl}
      />
      <Text ml={2} data-testid={`meme-author-${id}`}>
        {data.username}
      </Text>
    </>
  );
}
