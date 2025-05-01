import { useQuery } from "@tanstack/react-query";
import { getMemes, GetMemesResponse } from "../api";
import { useRef } from "react";
import { useAuthToken } from "../contexts/authentication";

type Meme = GetMemesResponse["results"][number];

export function useMemesQuery(page: number) {
  const token = useAuthToken();

  const memes = useRef<Meme[]>([]);
  return useQuery({
    queryKey: ["memes", page],
    queryFn: async () => {
      const data = await getMemes(token, page);
      memes.current.push(...data.results);
      return memes.current;
    },
  });
}
