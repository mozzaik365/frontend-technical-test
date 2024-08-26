import React from "react";

import { Box, Text } from "@chakra-ui/react";
import { MemeCardType } from "../../common/types/meme";

interface MemeCardBodyProps {
  id: MemeCardType["id"];
  description: MemeCardType["description"];
}

const MemeCardBody: React.FC<MemeCardBodyProps> = ({ id, description }) => {
  return (
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
  );
};

export default MemeCardBody;
