import { StackDivider, VStack } from "@chakra-ui/react";
import { ScrollRefProvider } from "../contexts/scroll-ref";

export const MemeListLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <ScrollRefProvider
      width="full"
      height="full"
      justifyContent="center"
      overflowY="auto"
    >
      <VStack
        p={4}
        width="full"
        maxWidth={800}
        divider={<StackDivider border="gray.200" />}
      >
        {children}
      </VStack>
    </ScrollRefProvider>
  );
};
