import { Form } from "react-router";
import type { Route } from "./+types/settings-page";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { useState } from "react";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Settings | WeMake", description: "WeMake 설정 페이지입니다." }
  ];
}

export default function SettingsPage() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setAvatar(URL.createObjectURL(file));
    }
  }
  return (
    <div className="space-y-20">
      <div className="grid grid-cols-6 gap-40">
        <div className="col-span-4 flex flex-col gap-10">
          <h2 className="text-2xl font-semibold">Edit profile</h2>
          <Form className="flex flex-col w-1/2 gap-5">
            <InputPair
              label="Name"
              name="name"
              id="name"
              description="Your public name"
              placeholder="John Doe"
              required
            />
            <SelectPair
              label="Role"
              description="What role do you do identify the most with?"
              name="role"
              placeholder="Select a role"
              options={[
                { label: "Developer", value: "developer" },
                { label: "Designer", value: "designer" },
                { label: "Product Manager", value: "product-manager" },
                { label: "Founder", value: "founder" },
                { label: "Other", value: "other" },
              ]}
            />
            <InputPair
              label="Bio"
              name="bio"
              id="bio"
              description="Your public bio. It will be displayed on your profile."
              placeholder="I'm a software engineer"
              required
              textArea
            />
            <InputPair
              label="Headline"
              name="headline"
              id="headline"
              description="An introduction to your profile."
              placeholder="I'm a software engineer"
              required
              textArea
            />
            <Button className="w-full">Update Profile</Button>
          </Form>
        </div>
        <aside className="col-span-2 p-6 rounded-lg border shadow-md">
          <Label className="flex flex-col gap-1">
            Avatar
            <small className="text-muted-foreground">
              This is your publicavatar.
            </small>
          </Label>
          <div className="space-y-5">
            <div className="size-40 rounded-full shadow-xl overflow-hidden">
              {avatar ?
                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                : null
              }
            </div>
            <Input type="file" className="w-1/2" onChange={onChange} required name="icon" />
            <div className="flex flex-col">
              <span className="text-muted-foreground">
                Recommended size: 128x128px
              </span>
              <span className="text-muted-foreground">
                Allowed formats: PNG, JPEG
              </span>
              <span className="text-muted-foreground">
                Max file size: 1MB
              </span>
            </div>
            <Button className="w-full">Update Avatar</Button>
          </div>
        </aside>
      </div>
    </div>
  );
} 