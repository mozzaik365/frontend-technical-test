import { createFileRoute } from "@tanstack/react-router";
import { Button, Flex, StackDivider, VStack, Text } from "@chakra-ui/react";
import { Loader } from "../../components/loader";
import { Meme } from "../../components/meme";
import { useState } from "react";
import { useMemesQuery } from "../../queries/useMemesQuery";

export const MemeFeedPage: React.FC = () => {
  const [page, setPage] = useState(1);

  const { status, data, isFetching } = useMemesQuery(page);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  if (status === "pending") {
    return <Loader data-testid="meme-feed-loader" />;
  }

  if (status === "error") {
    return <Text>Cannot retrieves memes</Text>;
  }

  return (
    <Flex width="full" height="full" justifyContent="center" overflowY="auto">
      <VStack
        p={4}
        width="full"
        maxWidth={800}
        divider={<StackDivider border="gray.200" />}
      >
        {data.map((meme) => (
          <VStack key={meme.id} p={4} width="full" align="stretch">
            <Meme {...meme} />
          </VStack>
        ))}

        <Button onClick={loadMore} disabled={isFetching} py={5}>
          {isFetching ? "Loading memes..." : "Load more memes"}
        </Button>
      </VStack>
    </Flex>
  );
};

export const Route = createFileRoute("/_authentication/")({
  component: MemeFeedPage,
});
