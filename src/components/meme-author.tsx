import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useUser } from "../hooks/use-user";

type MemeAuthorProps = {
  authorId: string;
  nameTestId?: string;
};

export const MemeAuthor: React.FC<MemeAuthorProps> = ({
  authorId,
  nameTestId,
}) => {
  const { data: author } = useUser(authorId);

  if (!author) {
    return null;
  }

  return (
    <Flex>
      <Avatar
        borderWidth="1px"
        borderColor="gray.300"
        size="xs"
        name={author.username}
        src={author.pictureUrl}
      />
      <Text ml={2} data-testid={nameTestId}>
        {author.username}
      </Text>
    </Flex>
  );
};
