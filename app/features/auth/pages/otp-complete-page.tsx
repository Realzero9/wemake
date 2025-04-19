import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/otp-complete-page";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Verify OTP | wemake", description: "OTP 인증을 완료해보세요" },
  ];
};

export default function OtpCompletePage() {
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Comfirm OTP</h1>
          <p className="text-sm text-muted-foreground">
            Enter the OTP code sent to your email address.
          </p>
        </div>
        <Form className="w-full space-y-4">
          <InputPair
            id="email"
            label="Email"
            description="Enter your email"
            name="email"
            required
            type="email"
            placeholder="Enter your email"
          />
          <InputPair
            id="otp"
            label="OTP"
            description="Enter your OTP"
            name="otp"
            required
            type="number"
            placeholder="Enter your OTP"
          />
          <Button className="w-full" type="submit">Log in</Button>
        </Form>
      </div>
    </div>
  );
} 