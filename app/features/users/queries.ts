import client from "~/supa-client";
import { productListSelect, postListSelect } from "../products/queries";

export const getUserByUsername = async (username: string) => {
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

export const getUserProducts = async (username: string) => {
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

export const getUserPosts = async (username: string) => {
  const { data, error } = await client.from("posts")
    .select(`*`)
    .eq("username", username);
  if (error) throw new Error(error.message);
  return data;
};
