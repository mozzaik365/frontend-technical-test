import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Flex, StackDivider, VStack } from "@chakra-ui/react";

import { useAuthToken } from "../contexts/authentication";
import { Loader } from "./loader";

import MemeCard from "./meme-card/meme-card";
import { getMemesService } from "../api/meme.service";

const MemeFeed: React.FC = () => {
  const token = useAuthToken();

  const { isLoading, data: memes } = useQuery({
    queryKey: ["memes"],
    queryFn: async () => getMemesService(token),
  });

  if (isLoading) {
    return <Loader data-testid="meme-feed-loader" />;
  }
  return (
    <Flex width="full" height="full" justifyContent="center" overflowY="auto">
      <VStack
        p={4}
        width="full"
        maxWidth={800}
        divider={<StackDivider border="gray.200" />}
      >
        {memes?.map((meme) => {
          return <MemeCard key={meme.id} meme={meme} />;
        })}
      </VStack>
    </Flex>
  );
};

export default MemeFeed;
