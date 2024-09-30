import { useAuthentication } from "../contexts/authentication";
import { useUser } from "./use-user";

export function useMyProfile() {
  const { state } = useAuthentication();
  const { data } = useUser(state.isAuthenticated ? state.userId : "anon");
  return data;
}
