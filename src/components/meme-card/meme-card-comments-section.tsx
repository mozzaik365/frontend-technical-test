import { Avatar, Box, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { format } from "timeago.js";
import { MemeCardCommentType } from "../../common/types/meme";

interface MemeCardCommentsSectionProps {
  memeId: string;
  commentsList?: MemeCardCommentType[];
}

const MemeCardCommentsSection: React.FC<MemeCardCommentsSectionProps> = ({
  memeId,
  commentsList,
}) => {
  return (
    <VStack align="stretch" spacing={4}>
      {commentsList?.map((comment: MemeCardCommentType) => (
        <Flex key={comment.id}>
          <Avatar
            borderWidth="1px"
            borderColor="gray.300"
            size="sm"
            name={comment.author.username}
            src={comment.author.pictureUrl}
            mr={2}
          />
          <Box p={2} borderRadius={8} bg="gray.50" flexGrow={1}>
            <Flex justifyContent="space-between" alignItems="center">
              <Flex>
                <Text
                  data-testid={`meme-comment-author-${memeId}-${comment.id}`}
                >
                  {comment.author.username}
                </Text>
              </Flex>
              <Text fontStyle="italic" color="gray.500" fontSize="small">
                {format(comment.createdAt)}
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
      ))}
    </VStack>
  );
};

export default MemeCardCommentsSection;
