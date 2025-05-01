import { useQuery } from "@tanstack/react-query";
import { getMemeComments } from "../api";
import { useAuthToken } from "../contexts/authentication";

export function useCommentsQuery(id: string, page: number) {
  const token = useAuthToken();

  return useQuery({
    queryKey: ["comments", { id, page }],
    queryFn: async () => getMemeComments(token, id, page),
  });
}

// export function useCommentAuthors({
//   token,
//   id,
// }: {
//   token: string;
//   ids: string[];
// }) {
//   return useQuery({
//     queryKey: ["comment-author", commentId],
//     queryFn: async () => getMemeComments(token, id, page),
//   });
// }
