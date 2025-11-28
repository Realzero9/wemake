import { redirect } from "react-router";
import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/my-profile-page";
import { getUserById } from "../queries";

export async function loader({ request }: Route.LoaderArgs) {
  const { client } = makeSSRClient(request);
  const { data: { user } } = await client.auth.getUser();
  if (user) {
    const profile = await getUserById(client, { profileId: user.id });
    if (profile && profile.username) {
      return redirect(`/users/${profile.username}`);
    }
    // If the profile or username doesn't exist, redirect to a setup page.
    return redirect("/my/settings"); 
  }
  return redirect("/auth/login");
}

export default function MyProfilePage() {
  return null; // This component is only used to satisfy the router's element requirement as the loader handles redirects
}