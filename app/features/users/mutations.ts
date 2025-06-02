import type { SupabaseClient } from "@supabase/supabase-js";

export const updateUser = async (
    client: SupabaseClient,
    { profileId, name, role, headline, bio }: { 
        profileId: string,
        name: string,
        role: "developer" | "designer" | "marketer" | "founder" | "product-manager",
        headline: string,
        bio: string
    }
) => {
  const { data, error } = await client
    .from("profiles")
    .update({ name, role, headline, bio })
    .eq("profile_id", profileId);
  if (error) throw error;
  return data;
}

export const updateUserAvatar = async (
    client: SupabaseClient,
    { profileId, avatarUrl }: { 
        profileId: string,
        avatarUrl: string
    }
) => {
  const { data, error } = await client
    .from("profiles")
    .update({ avatar: avatarUrl })
    .eq("profile_id", profileId);
  if (error) throw error;
  return data;
}

export const seeNotification = async (
    client: SupabaseClient,
    { userId, notificationId }: { userId: string, notificationId: string }
) => {
    const { error } = await client
      .from("notifications")
      .update({ seen: true })
      .eq("notification_id", notificationId)
      .eq("target_id", userId);
    if (error) throw error;
}