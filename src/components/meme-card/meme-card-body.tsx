import React from "react";

import { Box, Text } from "@chakra-ui/react";
import { MemeCardType } from "../../common/types/meme";
import { MemePicture } from "../meme-picture";

interface MemeCardBodyProps {
  meme: MemeCardType;
}

const MemeCardBody: React.FC<MemeCardBodyProps> = ({ meme }) => {
  const { pictureUrl, texts, id, description } = meme;
  return (
    <>
      <MemePicture
        pictureUrl={pictureUrl}
        texts={texts}
        dataTestId={`meme-picture-${id}`}
      />

      <Box>
        <Text fontWeight="bold" fontSize="medium" mb={2}>
          Description:
        </Text>
        <Box p={2} borderRadius={8} border="1px solid" borderColor="gray.100">
          <Text
            color="gray.500"
            whiteSpace="pre-line"
            data-testid={`meme-description-${id}`}
          >
            {description}
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default MemeCardBody;
