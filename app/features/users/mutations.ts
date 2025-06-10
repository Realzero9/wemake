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

export const sendMessage = async (
    client: SupabaseClient,
    { fromUserId, toUserId, content }: { fromUserId: string, toUserId: string, content: string }
) => {
    const { data, error } = await client
      .rpc("get_room", { from_user_id: fromUserId, to_user_id: toUserId })
      .maybeSingle() as { data: { message_room_id: string } | null, error: any };
    if (error) throw error;
    if (data?.message_room_id) {
      await client.from("messages").insert({
        message_room_id: data.message_room_id,
        sender_id: fromUserId,
        content,
      });
      return data.message_room_id;
    } else {
      const { data: roomData, error: roomError } = await client
        .from("message_rooms")
        .insert({})
        .select("message_room_id")
        .single();
      if (roomError) throw roomError;
      await client.from("message_room_members").insert([
        {
          message_room_id: roomData.message_room_id,
          profile_id: fromUserId,
        },
        {
          message_room_id: roomData.message_room_id,
          profile_id: toUserId,
        }
      ]);
      await client.from("messages").insert({
        message_room_id: roomData.message_room_id,
        sender_id: fromUserId,
        content,
      });
      return roomData.message_room_id;
    }
}
