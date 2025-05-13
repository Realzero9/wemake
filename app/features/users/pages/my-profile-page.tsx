import { redirect } from "react-router";
import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/my-profile-page";
import { getUserById } from "../queries";

export async function loader({ request }: Route.LoaderArgs) {
  const { client } = makeSSRClient(request);
  const { data: { user } } = await client.auth.getUser();
  if (user) {
    const profile = await getUserById(client, { profileId: user.id });
    return redirect(`/users/${profile.username}`);
  }
  return redirect("/auth/login");
}