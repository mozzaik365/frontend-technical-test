import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../api";
import { jwtDecode } from "jwt-decode";
import { useAuthToken } from "../contexts/authentication";

export function useLoggedUserQuery() {
  const token = useAuthToken();

  return useQuery({
    queryKey: ["logged-user"],
    queryFn: async () =>
      getUserById(token, jwtDecode<{ id: string }>(token).id),
  });
}

export function useUserQuery(id: string) {
  const token = useAuthToken();

  return useQuery({
    queryKey: ["user"],
    queryFn: async () => getUserById(token, id),
  });
}
