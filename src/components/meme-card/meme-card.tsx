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
    <VStack key={meme.id} p={4} width="full" align="stretch">
      <MemeCardHeader meme={meme} />
      <MemeCardBody id={meme.id} description={meme.description} />
      <MemeCardFooter meme={meme} />
    </VStack>
  );
};

export default MemeCard;
