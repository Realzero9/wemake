import supabase from "@supabase/supabase-js";
import { type Database } from "~/supa-client";

type SupabaseClient = ReturnType<typeof supabase.createClient<Database>>;

export const getGptIdeas = async (
    client: SupabaseClient,
    { limit }: { limit: number }
) => {
    const { data, error } = await client.from("gpt_ideas_view")
        .select("*")
        .limit(limit);
    if (error) throw new Error(error.message);
    return data;
}

export const getGptIdea = async (
    client: SupabaseClient,
    { ideaId }: { ideaId: string }
) => {
    const {data, error} = await client.from("gpt_ideas_view")
        .select("*")
        .eq("gpt_idea_id", Number(ideaId))
        .single();
    if (error) throw new Error(error.message);
    return data;
}
