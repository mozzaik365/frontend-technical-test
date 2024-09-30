import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../api";
import { useAuthToken } from "../contexts/authentication";

export function useUser(userId: string) {
  const token = useAuthToken();
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(token, userId),
  });
}
