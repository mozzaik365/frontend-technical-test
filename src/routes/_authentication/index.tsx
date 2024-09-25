import { Flex, StackDivider, VStack, Text } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { useFeed } from "../../hooks/use-feed";
import React from "react";
import { MemeCard } from "../../components/meme-card";

export const MemeFeedPage: React.FC = () => {
  const { feed, fetchNextPage, hasNextPage } = useFeed();
  console.log("hasNextPage", hasNextPage);
  return (
    <Flex width="full" height="full" justifyContent="center" overflowY="auto">
      <VStack
        p={4}
        width="full"
        maxWidth={800}
        divider={<StackDivider border="gray.200" />}
      >
        {feed?.pages.map((page) => {
          return page.results.map((meme) => {
            return <MemeCard key={meme.id} meme={meme} />;
          });
        })}

        <Text onClick={hasNextPage ? fetchNextPage : undefined}>feed2</Text>
      </VStack>
    </Flex>
  );
};

export const Route = createFileRoute("/_authentication/")({
  component: MemeFeedPage,
});
