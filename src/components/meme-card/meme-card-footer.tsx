import React from "react";

import { useState } from "react";

import { CaretDown, CaretUp, Chat } from "@phosphor-icons/react";

import { useMutation, useQuery } from "@tanstack/react-query";

import { jwtDecode } from "jwt-decode";
import { useAuthToken } from "../../contexts/authentication";

import {
  Avatar,
  Collapse,
  Box,
  Flex,
  Icon,
  Input,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";

import { createMemeComment, getUserById } from "../../api/api";
import { MemeCardCommentType } from "../../common/types/meme";
import { fetchComments } from "../../api/meme.service";
import MemeCardCommentsSection from "./meme-card-comments-section";

interface MemeCardFooterProps {
  memeId: string;
  commentsCount: string;
}

// Needs more refactor.
const MemeCardFooter: React.FC<MemeCardFooterProps> = ({
  memeId,
  commentsCount,
}) => {
  const token = useAuthToken();
  const [commentContent, setCommentContent] = useState<{
    [key: string]: string;
  }>({});

  const [commentsList, setCommentsList] = useState<MemeCardCommentType[]>([]);

  const [openedCommentSection, setOpenedCommentSection] = useState<
    string | null
  >(null);

  const { mutate } = useMutation({
    mutationFn: async (data: { memeId: string; content: string }) => {
      await createMemeComment(token, data.memeId, data.content);
    },
  });

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return await getUserById(token, jwtDecode<{ id: string }>(token).id);
    },
  });

  const loadComments = async () => {
    if (!openedCommentSection && commentsCount) {
      setCommentsList(await fetchComments(token, memeId));
    }
    setOpenedCommentSection(openedCommentSection === memeId ? null : memeId);
  };

  return (
    <>
      <LinkBox as={Box} py={2} borderBottom="1px solid black">
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <LinkOverlay
              data-testid={`meme-comments-section-${memeId}`}
              cursor="pointer"
              onClick={() => loadComments()}
            >
              <Text data-testid={`meme-comments-count-${memeId}`}>
                {commentsCount} comments
              </Text>
            </LinkOverlay>
            <Icon
              as={openedCommentSection !== memeId ? CaretDown : CaretUp}
              ml={2}
              mt={1}
            />
          </Flex>
          <Icon as={Chat} />
        </Flex>
      </LinkBox>
      <Collapse in={openedCommentSection === memeId} animateOpacity>
        <Box mb={6}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (commentContent[memeId]) {
                mutate({
                  memeId: memeId,
                  content: commentContent[memeId],
                });
              }
            }}
          >
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
                onChange={(event) => {
                  setCommentContent({
                    ...commentContent,
                    [memeId]: event.target.value,
                  });
                }}
                value={commentContent[memeId]}
              />
            </Flex>
          </form>
        </Box>
        <MemeCardCommentsSection memeId={memeId} commentsList={commentsList} />
      </Collapse>
    </>
  );
};

export default MemeCardFooter;
