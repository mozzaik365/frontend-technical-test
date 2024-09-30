import { jwtDecode } from "jwt-decode";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  authEventEmitter,
  getAuthState,
  logout,
  setToken,
} from "../services/api";
import { AuthenticationState } from "../types/authentication-state";

export type Authentication = {
  state: AuthenticationState;
  authenticate: (token: string) => void;
  signout: () => void;
};

export const AuthenticationContext = createContext<Authentication | undefined>(
  undefined
);

export const AuthenticationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [state, setState] = useState<AuthenticationState>(getAuthState());

  useEffect(() => {
    const login = () => {
      console.log("handle login event");
      setState(getAuthState());
    };

    const logout = () => {
      console.log("handle logout event");
      setState(getAuthState());
    };

    authEventEmitter.on("login", login);
    authEventEmitter.on("logout", logout);
    return () => {
      console.log("unmount");
      authEventEmitter.off("login", login);
      authEventEmitter.off("logout", logout);
    };
  }, []);

  const authenticate = useCallback((jwt: string) => {
    setToken(jwt);
  }, []);

  const signout = useCallback(() => {
    logout();
  }, []);

  const contextValue = useMemo(
    () => ({ state, authenticate, signout }),
    [state, authenticate, signout]
  );

  console.log("rerender auth context");

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export function useAuthentication() {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error(
      "useAuthentication must be used within an AuthenticationProvider"
    );
  }
  return context;
}

export function useAuthToken() {
  const { state } = useAuthentication();
  if (!state.isAuthenticated) {
    throw new Error("User is not authenticated");
  }
  return state.token;
}
