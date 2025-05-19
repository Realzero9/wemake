import { DotIcon, EyeIcon, HeartIcon } from "lucide-react";
import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/idea-page";
import { getGptIdea } from "../queries";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { Form, redirect } from "react-router";
import { claimIdea } from "../mutation";

export const meta = ({ data: {idea: {gpt_idea_id, idea}} }: Route.MetaArgs) => {
  return [
    { title: `Idea #${gpt_idea_id}: ${idea} | wemake` },
    { name: "description", content: "Find ideas for your next project" },
  ];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const idea = await getGptIdea(client, { ideaId: params.ideaId });
  if (idea.is_claimed) {
    throw redirect(`/ideas`);
  }
  return { idea };
};

export const action = async ({ params, request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const idea = await getGptIdea(client, { ideaId: params.ideaId });
  if (idea.is_claimed) {
    return { ok: false };
  }
  await claimIdea(client, { ideaId: params.ideaId, userId });
  return redirect(`/my/dashboard/ideas`);
};

export default function IdeaPage({ loaderData }: Route.ComponentProps) {
  return (
    <div>
        <Hero title={`Idea #${loaderData.idea.gpt_idea_id}`} />
        <div className="max-w-screen-sm mx-auto flex flex-col items-center gap-10">
            <p className="italic text-center">"{loaderData.idea.idea}"</p>
            <div className="flex items-center text-sm">
                <div className="flex items-center gap-1">
                    <EyeIcon className="size-4" />
                    <span>{loaderData.idea.views}</span>
                </div>
                <DotIcon className="size-4" />
                <span>{DateTime.fromISO(loaderData.idea.created_at).toRelative()}</span>
                <DotIcon className="size-4" />
                <Button variant="outline">
                    <HeartIcon className="size-4" />
                    <span>{loaderData.idea.likes}</span>
                </Button>
            </div>
            { loaderData.idea.is_claimed ? null : (
              <Form method="post">
                <Button size="lg">Claim idea now &rarr;</Button>
              </Form>
            )}
        </div>
    </div>
  );
} 