import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { MemeComment } from "../types/meme-comment";
import { format } from "timeago.js";
import { useUser } from "../hooks/use-user";

type MemeCommentProps = {
  comment: MemeComment;
  memeId: string;
  dataTestId?: string;
};

export const MemeCommentItem: React.FC<MemeCommentProps> = ({
  comment,
  memeId,
}: MemeCommentProps) => {
  const { data: author } = useUser(comment.authorId);
  //TODO:fix timezone from backend
  return (
    <Flex>
      <Avatar
        borderWidth="1px"
        borderColor="gray.300"
        size="sm"
        name={author?.username}
        src={author?.pictureUrl}
        loading="lazy"
        mr={2}
      />
      <Box p={2} borderRadius={8} bg="gray.50" flexGrow={1}>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex>
            <Text data-testid={`meme-comment-author-${memeId}-${comment.id}`}>
              {author?.username}
            </Text>
          </Flex>
          <Text fontStyle="italic" color="gray.500" fontSize="small">
            {format(comment.createdAt + "Z")}
          </Text>
        </Flex>
        <Text
          color="gray.500"
          whiteSpace="pre-line"
          data-testid={`meme-comment-content-${memeId}-${comment.id}`}
        >
          {comment.content}
        </Text>
      </Box>
    </Flex>
  );
};
