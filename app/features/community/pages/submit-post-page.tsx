import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-post-page";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Post | wemake", description: "게시글 작성 페이지입니다" },
  ];
};

export default function SubmitPostPage() {
  return (
    <div className="space-y-10">
      <Hero title="Create Discussion" subtitle="Ask questions, share ideas, and connect with other developers" />
      <Form className="flex flex-col gap-10 max-w-screen-md mx-auto">
        <InputPair
          label="Title"
          name="title"
          id="title"
          description="(40 characters or less)"
          placeholder="i.e What is the best productivity tools?"
          required
        />
        <SelectPair
          label="Category"
          name="category"
          placeholder="i.e Productivity"
          options={[
            { label: "General", value: "general" },
            { label: "Programming", value: "programming" },
            { label: "Design", value: "design" },
          ]}
          description="Select the category that best fits your discussion"
          required
        />
        <InputPair
          label="Content"
          name="content"
          id="content"
          description="(1000 characters or less)"
          placeholder="i.e I'm looking for a tool that can help me manage my time and tasks. What are the best tools out there?"
          required
          textArea
        />
        <Button>Create Discussion</Button>
      </Form>
    </div>
  );
}
