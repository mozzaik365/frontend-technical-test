import React from "react";

import { VStack } from "@chakra-ui/react";

import MemeCardFooter from "./meme-card-footer";
import MemeCardHeader from "./meme-card-header";
import MemeCardBody from "./meme-card-body";
import { MemeCardType } from "../../common/types/meme";

// Create proper types !
interface MemeCardProps {
  meme: MemeCardType;
}

const MemeCard: React.FC<MemeCardProps> = ({ meme }) => {
  return (
    <VStack p={4} width="full" align="stretch">
      <MemeCardHeader meme={meme} />
      <MemeCardBody meme={meme} />
      <MemeCardFooter memeId={meme.id} commentsCount={meme.commentsCount} />
    </VStack>
  );
};

export default MemeCard;
