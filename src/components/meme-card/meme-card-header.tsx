import React from "react";

import { format } from "timeago.js";

import { Avatar, Flex, Text } from "@chakra-ui/react";

import { MemePicture } from "../meme-picture";
import { MemeCardType } from "../../common/types/meme";

interface MemeCardHeaderProps {
  meme: MemeCardType;
}

const MemeCardHeader: React.FC<MemeCardHeaderProps> = ({ meme }) => {
  const { id, createdAt, author } = meme;

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Flex>
        <Avatar
          borderWidth="1px"
          borderColor="gray.300"
          size="xs"
          name={author.username}
          src={author.pictureUrl}
        />
        <Text ml={2} data-testid={`meme-author-${id}`}>
          {author.username}
        </Text>
      </Flex>
      <Text fontStyle="italic" color="gray.500" fontSize="small">
        {format(createdAt)}
      </Text>
    </Flex>
  );
};

export default MemeCardHeader;
