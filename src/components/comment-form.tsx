import { Box } from "@chakra-ui/react";
import { useCallback } from "react";

export const CommentForm: React.FC = () => {
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    if (commentContent[meme.id]) {
      mutate({
        memeId: meme.id,
        content: commentContent[meme.id],
      });
    }
  });

  return (
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
  );
};
