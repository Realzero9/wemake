import { productListSelect } from "../products/queries";

import supabase from "@supabase/supabase-js";
import { redirect } from "react-router";
import { type Database } from "~/supa-client";

type SupabaseClient = ReturnType<typeof supabase.createClient<Database>>;

export const getUserByUsername = async (
  client: SupabaseClient,
  { username }: { username: string }
) => {
  const { data, error } = await client.from("profiles")
    .select(`
        profile_id,
        name,
        username,
        avatar,
        role,
        headline,
        bio
    `)
    .eq("username", username)
    .single();
  if (error) throw new Error(error.message);
  return data;
};

export const getUserById = async (
  client: SupabaseClient,
  { profileId }: { profileId: string }
) => {
  const { data, error } = await client.from("profiles")
    .select(`
        profile_id,
        name,
        username,
        avatar,
        headline,
        bio,
        role
    `)
    .eq("profile_id", profileId)
    .single();
  if (error) throw error;
  return data;
};

export const getUserProducts = async (
    client: SupabaseClient,
    { username }: { username: string }
  ) => {
    const { data, error } = await client.from("products")
      .select(`
          ${productListSelect},
          profiles!products_to_profiles_fk!inner (
              profile_id
          )
      `)
      .eq("profiles.username", username);
    if (error) throw error;
    return data;
  };

export const getProductsByUserId = async (
  client: SupabaseClient,
  { userId }: { userId: string }
) => {
  const { data, error } = await client.from("products")
    .select(`
        name,
        product_id
    `)
    .eq("profile_id", userId);
  if (error) throw error;
  return data;
};

export const getUserPosts = async (
  client: SupabaseClient,
  { username }: { username: string }
) => {
  const { data, error } = await client.from("community_post_list_view")
    .select("*")
    .eq("author_username", username);
  if (error) throw error;
  return data;
};

export const getLoggedInUserId = async (client: SupabaseClient) => {
  const { data, error } = await client.auth.getUser();
  if (error || data.user === null) {
    throw redirect("/auth/login");
  }
  return data.user.id;
};
