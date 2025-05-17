import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-post-page";
import { Form, useNavigation } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { getTopics } from "../queries";
import { z } from "zod";
import { redirect } from "react-router";
import { createPost } from "../mutations";
import { LoaderCircle } from "lucide-react";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Post | wemake", description: "게시글 작성 페이지입니다" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const topics = await getTopics(client);
  return { topics };
};

const formSchema = z.object({
  title: z.string().min(1).max(40),
  content: z.string().min(1).max(1000),
  category: z.string().min(1).max(100),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, error, data } = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return {
      fieldErrors: error.flatten().fieldErrors,
    };
  }
  const { title, content, category } = data;
  const { post_id, error: createPostError } = await createPost(client, {
    title,
    category,
    content,
    userId,
  });
  if (createPostError) {
    return {
      error: createPostError.message,
    };
  }
  return redirect(`/community/${post_id}`);
};

export default function SubmitPostPage({ loaderData, actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting" || navigation.state === "loading";
  console.log(loaderData);
  console.log(actionData);
  return (
    <div className="space-y-10">
      <Hero title="Create Discussion" subtitle="Ask questions, share ideas, and connect with other developers" />
      <Form className="flex flex-col gap-10 max-w-screen-md mx-auto" method="post">
        <InputPair
          label="Title"
          name="title"
          id="title"
          description="(40 characters or less)"
          placeholder="i.e What is the best productivity tools?"
          required
        />
        {actionData && "fieldErrors" in actionData && (<div className="text-red-500">{actionData.fieldErrors?.title?.join(", ")}</div>)}
        <SelectPair
          label="Category"
          name="category"
          placeholder="i.e Productivity"
          options={loaderData.topics.map((topic) => ({
            label: topic.name,
            value: topic.slug,
          }))}
          description="Select the category that best fits your discussion"
          required
        />
        {actionData && "fieldErrors" in actionData && (<div className="text-red-500">{actionData.fieldErrors?.category?.join(", ")}</div>)}
        <InputPair
          label="Content"
          name="content"
          id="content"
          description="(1000 characters or less)"
          placeholder="i.e I'm looking for a tool that can help me manage my time and tasks. What are the best tools out there?"
          required
          textArea
        />
        {actionData && "fieldErrors" in actionData && (<div className="text-red-500">{actionData.fieldErrors?.content?.join(", ")}</div>)}
        <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <LoaderCircle className="animate-spin" /> : "Create Discussion"}
          </Button>
      </Form>
    </div>
  );
}
