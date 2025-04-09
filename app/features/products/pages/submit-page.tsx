import { Hero } from "~/common/components/hero";
import { Button } from "../../../common/components/ui/button";
import type { Route } from "./+types/submit-page";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Product | wemake" },
    { name: "description", content: "Submit a new product on wemake" },
  ];
}

export default function SubmitPage() {
  return (
    <div>
      <Hero title="Submit Your Product" subtitle="Share your product with the world" />
      <Form className="grid grid-cols-2 gap-10 max-w-screen-lg mx-auto">
        <div className="space-y-5">
          <InputPair
            label="Name"
            description="This is the name of your product."
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your product's name"
          />
          <InputPair
            label="Tagline"
            description="(60 characters or less)"
            id="tagline"
            name="tagline"
            type="text"
            required
            placeholder="A concise description of your product"
          />
          <InputPair
            label="URL"
            description="The URL of your product"
            id="url"
            name="url"
            required
            type="url"
            placeholder="https://example.com"
          />
          <InputPair
            label="Description"
            description="A detailed description of your product"
            id="description"
            name="description"
            required
            textArea
            placeholder="A detailed description of your product"
          />
          <SelectPair
            label="Category"
            description="The category of your product"
            name="category"
            required
            placeholder="Select a category"
            options={[
              { label: "Category 1", value: "category-1" },
              { label: "Category 2", value: "category-2" },
            ]}
          />
        </div>
      </Form>
    </div>
  );
} 