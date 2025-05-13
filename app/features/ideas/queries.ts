import { type Database } from "~/supa-client"
import { SupabaseClient } from "@supabase/supabase-js"

export const getGptIdeas = async (
    client: SupabaseClient<Database>,
    { limit }: { limit: number }
) => {
    const { data, error } = await client.from("gpt_ideas_view")
        .select("*")
        .limit(limit);
    if (error) throw new Error(error.message);
    return data;
}

export const getGptIdea = async (
    client: SupabaseClient<Database>,
    { ideaId }: { ideaId: string }
) => {
    const {data, error} = await client.from("gpt_ideas_view")
        .select("*")
        .eq("gpt_idea_id", Number(ideaId))
        .single();
    if (error) throw new Error(error.message);
    return data;
}
