import { redirect } from "react-router";

export function loader() {
  // find user using the cookie
  return redirect("/users/nico");
}