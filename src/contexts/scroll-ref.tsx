import { Flex, FlexProps } from "@chakra-ui/react";
import { createContext, useRef, useMemo, useContext } from "react";

type ScrollRefState = {
  ref: React.RefObject<HTMLDivElement> | null;
};

const ScrollRefContext = createContext<ScrollRefState | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useScrollRef() {
  const context = useContext(ScrollRefContext);
  if (!context) {
    throw new Error(
      "useAuthentication must be used within an AuthenticationProvider"
    );
  }
  return context;
}

export const ScrollRefProvider: React.FC<
  React.PropsWithChildren<FlexProps>
> = ({ children, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);

  const value = useMemo(() => ({ ref }), [ref]);

  return (
    <ScrollRefContext.Provider value={value}>
      <Flex ref={ref} {...props}>
        {children}
      </Flex>
    </ScrollRefContext.Provider>
  );
};
