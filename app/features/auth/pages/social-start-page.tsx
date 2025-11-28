import { redirect } from "react-router";
import type { Route } from "./+types/social-start-page";
import { makeSSRClient } from "~/supa-client";
import { z } from "zod";

const paramsSchema = z.object({
  provider: z.enum(["github", "kakao"]),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { success, data } = paramsSchema.safeParse(params);
  if (!success) {
    return redirect("/auth/login");
  }
  const { provider } = data;
  const requestUrl = new URL(request.url);
  const redirectTo = `${requestUrl.origin}/auth/social/${provider}/complete`;
  const { client, headers } = makeSSRClient(request);
  const {
    data: { url },     // 소셜 로그인 페이지로 리다이렉트 할 주소
    error,
  } = await client.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo,    // 소셜 로그인 후 redirect 할 주소
    },
  });
  if (url) {
    return redirect(url, { headers });
  }
  if (error) {
    throw error;
  }
} 