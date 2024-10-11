import { useCallback, useEffect, useState } from "react";
import { useFeed } from "../hooks/use-feed";
import { MemeCard } from "./meme-card";
import { useScrollRef } from "../contexts/scroll-ref";
import { useInView } from "react-intersection-observer";

export const MemeList: React.FC = () => {
  const { data: feed, fetchNextPage, hasNextPage, isFetching } = useFeed();

  const [openedCommentsMemeId, setOpenedCommentsMemeId] = useState<
    string | null
  >(null);

  const handleOpenComments = useCallback((memeId: string) => {
    setOpenedCommentsMemeId((prev) => {
      return prev === memeId ? null : memeId;
    });
  }, []);

  const scrollRef = useScrollRef();

  const { ref, inView } = useInView({
    root: scrollRef.ref?.current,
    rootMargin: "400px 0px",
    skip: isFetching || !hasNextPage,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <>
      {feed?.pages.map((page) => {
        return page.results.map((meme) => {
          return (
            <MemeCard
              key={meme.id}
              meme={meme}
              commentsOpened={meme.id === openedCommentsMemeId}
              onOpenComments={handleOpenComments}
            />
          );
        });
      })}
      <div key="more" ref={ref}>
        hello
      </div>
    </>
  );
};
