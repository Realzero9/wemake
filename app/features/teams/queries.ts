import supabase from "@supabase/supabase-js";
import { type Database } from "~/supa-client";

type SupabaseClient = ReturnType<typeof supabase.createClient<Database>>;

export const getTeams = async (
    client: SupabaseClient,
    { limit }: { limit: number }
) => {
    const {data, error} = await client.from("teams")
        .select(`
            team_id,
            roles,
            product_description,
            team_leader:profiles!inner(
                username,
                avatar
            )
        `)
        .limit(limit);
    if (error) throw new Error(error.message);
    return data;
}

export const getTeamById = async (
    client: SupabaseClient,
    { teamId }: { teamId: number }
) => {
    const {data, error} = await client.from("teams")
        .select(`
            *,
            team_leader:profiles!inner(
                name,
                avatar,
                role
            )
        `)
        .eq("team_id", teamId)
        .single();
    if (error) throw new Error(error.message);
    return data;
}
