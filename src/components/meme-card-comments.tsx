import {
  Box,
  Collapse,
  Flex,
  Icon,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import { CaretDown, CaretUp, Chat } from "@phosphor-icons/react";
import { useCallback } from "react";
import { CommentList } from "./comment-list";

type MemeCardCommentsProps = {
  memeId: string;
  commentCount: number;
  opened: boolean;
  onOpen: (memeId: string) => void;
};

export const MemeCardComments: React.FC<MemeCardCommentsProps> = ({
  memeId,
  commentCount,
  opened,
  onOpen,
}) => {
  const handleClickOpen = useCallback(() => {
    onOpen(memeId);
  }, [memeId, onOpen]);
  return (
    <>
      <LinkBox as={Box} py={2} borderBottom="1px solid black">
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <LinkOverlay
              data-testid={`meme-comments-section-${memeId}`}
              cursor="pointer"
              onClick={handleClickOpen}
            >
              <Text data-testid={`meme-comments-count-${memeId}`}>
                {commentCount > 1
                  ? `${commentCount} comments`
                  : `${commentCount} comment`}
              </Text>
            </LinkOverlay>
            <Icon as={opened ? CaretDown : CaretUp} ml={2} mt={1} />
          </Flex>
          <Icon as={Chat} />
        </Flex>
      </LinkBox>
      <Collapse in={opened} animateOpacity unmountOnExit>
        <CommentList memeId={memeId} />
      </Collapse>
    </>
  );
};
