import { Form, redirect } from "react-router";
import type { Route } from "./+types/submit-team-page";
import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { PRODUCT_STAGES } from "../constants";
import { getLoggedInUserId } from "~/features/users/queries";
import { makeSSRClient } from "~/supa-client";
import { z } from "zod";
import { createTeam } from "../mutation";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Create Team | WeMake", description: "WeMake 새 팀 등록 페이지입니다." }
  ];
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
}

export const formSchema = z.object({
  name: z.string().min(1).max(20),
  stage: z.string(),
  size: z.coerce.number().min(1).max(100),
  equity: z.coerce.number().min(1).max(100),
  roles: z.string(),
  description: z.string().min(1).max(200),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return {
      fieldErrors: error?.flatten().fieldErrors,
    };
  }
  const { team_id } = await createTeam(client, userId, {...data});
  return redirect(`/teams/${team_id}`);
}

export default function SubmitTeamPage({ actionData }: Route.ComponentProps) {
  return (
    <div className="space-y-20">
      <Hero title="Create Team" subtitle="Create a team to find a team mate" />
      <Form className="max-w-screen-2xl flex flex-col items-center gap-10 mx-auto" method="post">
        <div className="grid grid-cols-3 gap-10 w-full">
            <InputPair
                label="What is the name of the product?"
                placeholder="e.g. Doggy social"
                description="(20 characters max)"
                name="name"
                maxLength={20}
                type="text"
                id="name"
                required
            />
            { actionData && "fieldErrors" in actionData && (
              <div className="text-red-500">
                {actionData.fieldErrors?.name?.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
            <SelectPair
                label="What is the stage of your product?"
                description="Select the stage of your product"
                name="stage"
                required
                placeholder="Select the stage of your product"
                options={PRODUCT_STAGES}
            />
            { actionData && "fieldErrors" in actionData && (
              <div className="text-red-500">
                {actionData.fieldErrors?.stage?.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
            <InputPair
                label="What is the size of your team?"
                description="(1-100)"
                name="size"
                maxLength={100}
                minLength={1}
                type="number"
                id="size"
                required
            />
            { actionData && "fieldErrors" in actionData && (
              <div className="text-red-500">
                {actionData.fieldErrors?.size?.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
            <InputPair
                label="How much equity are you willing to give?"
                description="(*each)"
                name="equity"
                maxLength={100}
                minLength={1}
                type="number"
                id="equity"
                required
            />
            { actionData && "fieldErrors" in actionData && (
              <div className="text-red-500">
                {actionData.fieldErrors?.equity?.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
            <InputPair
                label="What roles are you looking for?"
                placeholder="e.g. React Developer, Backend Developer, Product Developer"
                description="(comma separated)"
                name="roles"
                type="text"
                id="roles"
                required
            />
            { actionData && "fieldErrors" in actionData && (
              <div className="text-red-500">
                {actionData.fieldErrors?.roles?.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
            <InputPair
                label="What is the description of your product?"
                description="(200 characters max)"
                placeholder="e.g. We are looking for a React Developer to join our team. We are a startup that is building a new social media platform."
                name="description"
                maxLength={200}
                type="text"
                id="description"
                required
                textArea
            />
            { actionData && "fieldErrors" in actionData && (
              <div className="text-red-500">
                {actionData.fieldErrors?.description?.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
        </div>
        <Button type="submit" className="w-full max-w-sm" size="lg">
            Create Team
        </Button>
      </Form>
    </div>
  );
} 