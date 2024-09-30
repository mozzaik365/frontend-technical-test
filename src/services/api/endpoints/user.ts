import { axiosClient } from "../axios-client";
import * as z from "zod";

const schema = z.object({
  id: z.string(),
  username: z.string(),
  pictureUrl: z.string(),
});

export type GetUserResponse = z.infer<typeof schema>;

export async function getUserById(userId: string) {
  const result = await axiosClient.get(`/users/${userId}`);
  return schema.parse(result.data);
}
