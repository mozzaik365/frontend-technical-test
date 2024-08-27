import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Box, Button, Flex, StackDivider, VStack } from "@chakra-ui/react";

import { useAuthToken } from "../contexts/authentication";
import { Loader } from "./loader";

import MemeCard from "./meme-card/meme-card";
import { getMemesService } from "../api/meme.service";

const MemeFeed: React.FC = () => {
  const token = useAuthToken();

  const { isLoading, hasNextPage, isFetchingNextPage, fetchNextPage, data } =
    useInfiniteQuery({
      queryFn: async ({ pageParam = 1 }) => getMemesService(token, pageParam),
      queryKey: ["memePage"],
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) => {
        return Math.ceil(lastPage.total / lastPage.pageSize) > pages.length
          ? pages.length + 1
          : undefined;
      },
      refetchOnWindowFocus: false,
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
        {data?.pages.flatMap((memePages) =>
          memePages.results.map((meme) => (
            <MemeCard key={meme.id} meme={meme} />
          ))
        )}
        <Box py={4}>
          {hasNextPage && !isFetchingNextPage && (
            <Button mb={2} onClick={() => fetchNextPage()}>
              Load More
            </Button>
          )}
          {isFetchingNextPage && <Loader data-testid="meme-feed-loader-more" />}
        </Box>
      </VStack>
    </Flex>
  );
};

export default MemeFeed;
