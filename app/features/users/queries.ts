import { type Database } from "~/supa-client";
import { productListSelect } from "../products/queries";
import { SupabaseClient } from "@supabase/supabase-js";

export const getUserByUsername = async (
  client: SupabaseClient<Database>,
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

  export const getUserProducts = async (
  client: SupabaseClient<Database>,
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

export const getUserPosts = async (
  client: SupabaseClient<Database>,
  { username }: { username: string }
) => {
  const { data, error } = await client.from("community_post_list_view")
    .select("*")
    .eq("author_username", username);
  if (error) throw error;
  return data;
};
