import { Avatar, Box, Flex, Input } from "@chakra-ui/react";
import { useCreateCommentMutation } from "../queries/useCreateCommentMutation";
import { useLoggedUserQuery } from "../queries/useUserQuery";

export function CommentForm({
  memeId,
  onCommentCreated,
}: {
  memeId: string;
  onCommentCreated?: () => void;
}) {
  const { mutate } = useCreateCommentMutation();
  const { data } = useLoggedUserQuery();

  return (
    <Box mb={6}>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const form = event.currentTarget;
          const formData = new FormData(form);
          const content = formData.get("content")?.toString();
          if (content) {
            await mutate({ memeId, content });
            onCommentCreated?.();
            form.reset();
          }
        }}
      >
        <Flex alignItems="center">
          <Avatar
            borderWidth="1px"
            borderColor="gray.300"
            name={data?.username}
            src={data?.pictureUrl}
            size="sm"
            mr={2}
          />
          <Input name="content" placeholder="Type your comment here..." />
        </Flex>
      </form>
    </Box>
  );
}
