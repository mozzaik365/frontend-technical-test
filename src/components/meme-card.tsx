import { Text } from "@chakra-ui/react";
import { Meme } from "../api";

type MemeCardProps = {
  meme: Meme;
};
export const MemeCard: React.FC<MemeCardProps> = ({ meme }) => {
  return <Text>{meme.description}</Text>;
};
