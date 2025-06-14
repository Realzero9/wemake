import { Form } from "react-router";
import type { Route } from "./+types/settings-page";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { useState } from "react";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import { Button } from "~/common/components/ui/button";
import { getLoggedInUserId, getUserById } from "../queries";
import { makeSSRClient } from "~/supa-client";
import { z } from "zod";
import { updateUser, updateUserAvatar } from "../mutations";
import { Alert, AlertDescription, AlertTitle } from "~/common/components/ui/alert";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Settings | WeMake", description: "WeMake 설정 페이지입니다." }
  ];
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const user = await getUserById(client, { profileId: userId });
  return { user };
}

const formSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  headline: z.string().optional().default(""),
  bio: z.string().optional().default(""),
})

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const avatar = formData.get("avatar");
  if (avatar && avatar instanceof File) {
    // 파일 타입과 크기 검사
    if (avatar.size <= 2097152 && avatar.type.startsWith("image/")) {
      const { data, error } = await client.storage.from("avatars").upload(`${userId}/${Date.now()}`, avatar, {
        contentType: avatar.type,
        upsert: false,
      });
      if (error) {
        return {
          formErrors: {
            avatar: ["Failed to upload avatar"],
          },
        };
      }
      // 파일 업로드 성공 후 공용 URL 가져오기
      const { data : { publicUrl } } = await client.storage.from("avatars").getPublicUrl(data.path);
      // 사용자 아바타 업데이트
      await updateUserAvatar(client, { profileId: userId, avatarUrl: publicUrl });
      return {
        ok: true,
      };
    } else {
      return {
        formErrors: {
          avatar: ["Invalid file type or size"],
        },
      };
    }
  } else {
    const { success, error, data } = formSchema.safeParse(Object.fromEntries(formData));
    if (!success) {
      return {
        formErrors: error.flatten().fieldErrors,
      };
    }
    const { name, role, headline, bio } = data;
    await updateUser(client, { profileId: userId, name, role: role as "developer" | "designer" | "marketer" | "founder" | "product-manager", headline, bio });
    return {
      ok: true,
    };
  }
}

export default function SettingsPage({ loaderData, actionData }: Route.ComponentProps) {
  const [avatar, setAvatar] = useState<string | null>(loaderData.user.avatar);
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
          {actionData?.ok ? (
            <Alert>
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Profile updated successfully</AlertDescription>
            </Alert>
          ) : null }
          <h2 className="text-2xl font-semibold">Edit profile</h2>
          <Form className="flex flex-col w-1/2 gap-5" method="post">
            <InputPair
              label="Name"
              name="name"
              id="name"
              description="Your public name"
              defaultValue={loaderData.user.name}
              required
            />
            {actionData?.formErrors && "name" in actionData?.formErrors ? (
              <Alert>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{actionData.formErrors?.name?.join(", ")}</AlertDescription>
              </Alert>
            ) : null}
            <SelectPair
              label="Role"
              description="What role do you do identify the most with?"
              name="role"
              defaultValue={loaderData.user.role}
              placeholder="Select a role"
              options={[
                { label: "Developer", value: "developer" },
                { label: "Designer", value: "designer" },
                { label: "Marketer", value: "marketer" },
                { label: "Founder", value: "founder" },
                { label: "Product Manager", value: "product-manager" },
              ]}
            />
            {actionData?.formErrors && "role" in actionData?.formErrors ? (
              <Alert>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{actionData.formErrors?.role?.join(", ")}</AlertDescription>
              </Alert>
            ) : null}
            <InputPair
              label="Headline"
              name="headline"
              id="headline"
              description="An introduction to your profile."
              defaultValue={loaderData.user.headline ?? ""}
              required
              textArea
            />
            {actionData?.formErrors && "headline" in actionData?.formErrors ? (
              <Alert>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{actionData.formErrors?.headline?.join(", ")}</AlertDescription>
              </Alert>
            ) : null}
            <InputPair
              label="Bio"
              name="bio"
              id="bio"
              description="Your public bio. It will be displayed on your profile."
              defaultValue={loaderData.user.bio ?? ""}
              required
              textArea
            />
            {actionData?.formErrors && "bio" in actionData?.formErrors ? (
              <Alert>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{actionData.formErrors?.bio?.join(", ")}</AlertDescription>
              </Alert>
            ) : null}
            <Button className="w-full">Update Profile</Button>
          </Form>
        </div>
        <Form
          className="col-span-2 p-6 rounded-lg border shadow-md"
          method="post"
          encType="multipart/form-data"
        >
          <Label className="flex flex-col gap-1">
            Avatar
            <small className="text-muted-foreground">
              This is your public avatar.
            </small>
          </Label>
          <div className="space-y-5">
            <div className="size-40 rounded-full shadow-xl overflow-hidden">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : null }
            </div>
            <Input
              type="file"
              className="w-1/2"
              onChange={onChange}
              required
              name="avatar"
            />
            { actionData?.formErrors && "avatar" in actionData.formErrors ? (
              <Alert>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{actionData.formErrors.avatar.join(", ")}</AlertDescription>
              </Alert>
            ) : null }
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
        </Form>
      </div>
    </div>
  );
} 