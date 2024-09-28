import { Avatar, Box, Flex, Input, Text } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSubmitComment } from "../hooks/use-submit-comment";
import { useMyProfile } from "../hooks/use-my-profile";

type CommentFormProps = {
  memeId: string;
};

type Inputs = {
  content: string;
};

export const CommentForm: React.FC<CommentFormProps> = ({ memeId }) => {
  const {
    register,
    handleSubmit,
    resetField,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const { mutate } = useSubmitComment(memeId);

  const user = useMyProfile();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const trimed = data.content.trim();
    if (trimed.length === 0) {
      return;
    }
    try {
      mutate(data);
      resetField("content");
    } catch (e) {
      setError("content", {
        type: "custom",
        message: "Oopps! Something went wrong. Try again.",
      });
    }
  };

  return (
    <Box mb={6}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            {...register("content", { required: true })}
          />
        </Flex>
        {errors.content && (
          <Text color="red.500" fontSize="sm">
            {errors.content.message}
          </Text>
        )}
      </form>
    </Box>
  );
};
