import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { formSchema } from "./pages/submit-team-page";


export const createTeam = async (
    client: SupabaseClient,
    userId: string,
    team: z.infer<typeof formSchema>
) => {
  const { data, error } = await client.from("teams").insert({
    team_leader_id: userId,
    team_size: team.size,
    product_name: team.name,
    product_stage: team.stage as "idea" | "prototype" | "mvp" | "growth" | "mature",
    product_description: team.description,
    roles: team.roles,
    equity_split: team.equity
  })
  .select("team_id")
  .single();
  if (error) throw error;
  return data;
}