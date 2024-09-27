import { Box, Flex, Text, VStack } from "@chakra-ui/react";

import { MemePicture } from "./meme-picture";
import { format } from "timeago.js";
import { Meme } from "../types/meme";
import { MemeAuthor } from "./meme-author";
import { MemeCardComments } from "./meme-card-comments";

type MemeCardrops = {
  meme: Meme;
  commentsOpened: boolean;
  onOpenComments: (memeId: string) => void;
};
export const MemeCard: React.FC<MemeCardrops> = ({
  meme,
  commentsOpened,
  onOpenComments,
}) => {
  return (
    <VStack p={4} width="full" align="stretch">
      <Flex justifyContent="space-between" alignItems="center">
        <MemeAuthor
          authorId={meme.authorId}
          nameTestId={`meme-author-${meme.id}`}
        />
        <Text fontStyle="italic" color="gray.500" fontSize="small">
          {format(meme.createdAt)}
        </Text>
      </Flex>
      <MemePicture
        pictureUrl={meme.pictureUrl}
        texts={meme.texts}
        dataTestId={`meme-picture-${meme.id}`}
      />
      <Box>
        <Text fontWeight="bold" fontSize="medium" mb={2}>
          Description:{" "}
        </Text>
        <Box p={2} borderRadius={8} border="1px solid" borderColor="gray.100">
          <Text
            color="gray.500"
            whiteSpace="pre-line"
            data-testid={`meme-description-${meme.id}`}
          >
            {meme.description}
          </Text>
        </Box>
      </Box>

      <MemeCardComments
        memeId={meme.id}
        commentCount={meme.commentsCount}
        opened={commentsOpened}
        onOpen={onOpenComments}
      />

      {/* <LinkBox as={Box} py={2} borderBottom="1px solid black">
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <LinkOverlay
              data-testid={`meme-comments-section-${meme.id}`}
              cursor="pointer"
              onClick={() =>
                setOpenedCommentSection(
                  openedCommentSection === meme.id ? null : meme.id
                )
              }
            >
              <Text data-testid={`meme-comments-count-${meme.id}`}>
                {meme.commentsCount} comments
              </Text>
            </LinkOverlay>
            <Icon
              as={openedCommentSection !== meme.id ? CaretDown : CaretUp}
              ml={2}
              mt={1}
            />
          </Flex>
          <Icon as={Chat} />
        </Flex>
      </LinkBox> */}

      {/* <Collapse in={openedCommentSection === meme.id} animateOpacity>
        <Box mb={6}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (commentContent[meme.id]) {
                mutate({
                  memeId: meme.id,
                  content: commentContent[meme.id],
                });
              }
            }}
          >
            <Flex alignItems="center">
              <Avatar
                borderWidth="1px"
                borderColor="gray.300"
                name={user?.username}
                src={user?.pictureUrl}
                size="sm"
                mr={2}
              />
              <Input
                placeholder="Type your comment here..."
                onChange={(event) => {
                  setCommentContent({
                    ...commentContent,
                    [meme.id]: event.target.value,
                  });
                }}
                value={commentContent[meme.id]}
              />
            </Flex>
          </form>
        </Box>
        <VStack align="stretch" spacing={4}>
          {meme.comments.map((comment) => (
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
                      data-testid={`meme-comment-author-${meme.id}-${comment.id}`}
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
                  data-testid={`meme-comment-content-${meme.id}-${comment.id}`}
                >
                  {comment.content}
                </Text>
              </Box>
            </Flex>
          ))}
        </VStack>
      </Collapse> */}
    </VStack>
  );
};
