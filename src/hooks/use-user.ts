import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../services/api";

export function useUser(userId: string) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
  });
}
