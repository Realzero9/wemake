import type { SupabaseClient } from "@supabase/supabase-js";

export const claimIdea = async (
    client: SupabaseClient,
    { ideaId, userId }: { ideaId: string, userId: string }
) => {
    const { error } = await client
        .from("gpt_ideas")
        .update({
            claimed_by: userId,
            claimed_at: new Date().toISOString(),
        })
        .eq("gpt_idea_id", ideaId);
    if (error) {
        throw error;
    }
};

export const insertIdeas = async (client: SupabaseClient, ideas: string[]) => {
    const { error } = await client
        .from("gpt_ideas")
        .insert(ideas.map((idea) => ({
            idea,
            created_at: new Date().toISOString(),
        }))
    );
    if (error) {
        throw error;
    }
};
