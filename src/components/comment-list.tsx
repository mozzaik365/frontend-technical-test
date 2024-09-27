import { VStack } from "@chakra-ui/react";
import { useCommentList } from "../hooks/use-comment-list";
import { MemeCommentItem } from "./meme-comment-item";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useScrollRef } from "../contexts/scroll-ref";

type CommentListProps = {
  memeId: string;
};

export const CommentList: React.FC<CommentListProps> = ({ memeId }) => {
  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useCommentList(memeId);

  const scrollRef = useScrollRef();
  const { ref, inView } = useInView({
    rootMargin: "200px",
    root: scrollRef.ref?.current,
  });

  useEffect(() => {
    fetchNextPage();
  }, [inView, fetchNextPage]);
  return (
    <VStack align="stretch" spacing={4}>
      {comments?.pages.map((page) => {
        return page.results.map((comment) => {
          return (
            <MemeCommentItem
              key={comment.id}
              comment={comment}
              memeId={memeId}
            />
          );
        });
      })}
      {hasNextPage && !isFetching && <div ref={ref} />}
    </VStack>
  );
};
