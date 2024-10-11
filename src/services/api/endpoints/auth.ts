import { axiosClient } from "../axios-client";
import * as z from "zod";

const schema = z.object({
  jwt: z.string(),
});

export type LoginResponse = z.infer<typeof schema>;

export async function login(username: string, password: string) {
  const result = await axiosClient.post("/authentication/login", {
    username,
    password,
  });

  return schema.parse(result.data);
}
