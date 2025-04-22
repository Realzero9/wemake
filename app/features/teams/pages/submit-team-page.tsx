import { Form } from "react-router";
import type { Route } from "./+types/submit-team-page";
import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
export const meta: Route.MetaFunction = () => {
  return [
    { title: "Create Team | WeMake", description: "WeMake 새 팀 등록 페이지입니다." }
  ];
}

export default function SubmitTeamPage() {
  return (
    <div className="space-y-20">
      <Hero title="Create Team" subtitle="Create a team to find a team mate" />
      <Form className="max-w-screen-2xl flex flex-col items-center gap-10 mx-auto">
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
            <SelectPair
                label="What is the stage of your product?"
                description="Select the stage of your product"
                name="stage"
                required
                placeholder="Select the stage of your product"
                options={[
                    { label: "Idea", value: "idea" },
                    { label: "Prototype", value: "prototype" },
                    { label: "MVP", value: "mvp" },
                    { label: "Growth", value: "growth" },
                    { label: "Mature", value: "mature" },
                ]}
            />
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
            <InputPair
                label="What roles are you looking for?"
                placeholder="e.g. React Developer, Backend Developer, Product Developer"
                description="(comma separated)"
                name="roles"
                type="text"
                id="roles"
                required
            />
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
        </div>
        <Button type="submit" className="w-full max-w-sm" size="lg">
            Create Team
        </Button>
      </Form>
    </div>
  );
} 