import { Avatar, Box, Flex, Input } from "@chakra-ui/react";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "../types/user";
import { createMemeComment } from "../api";
import { useMutation } from "@tanstack/react-query";
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
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  console.log(",,,memeId", memeId);
  const { mutate } = useSubmitComment(memeId);

  const user = useMyProfile();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("on submit");
    mutate(data);
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
      </form>
    </Box>
  );
};
