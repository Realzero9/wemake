import { Form } from "react-router";
import { Hero } from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from "../constants";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/submit-job-page";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { redirect } from "react-router";
import { z } from "zod";
import { createJob } from "../mutations";

export const meta = () => [
  { title: "Post a Job | wemake" },
  { name: "description", content: "Reach out to the best developers in the world" },
];

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
};

export const formSchema = z.object({
  position: z.string().max(40),
  overview: z.string().max(400),
  responsibilities: z.string().max(400),
  qualifications: z.string().max(400),
  benefits: z.string().max(400),
  skills: z.string().max(400),
  companyName: z.string().max(40),
  companyLogoUrl: z.string().max(40),
  companyLocation: z.string().max(40),
  applyUrl: z.string().max(40),
  jobType: z.enum(JOB_TYPES.map((jobType) => jobType.value) as [string, ...string[]]),
  jobLocation: z.enum(LOCATION_TYPES.map((location) => location.value) as [string, ...string[]]),
  salaryRange: z.enum(SALARY_RANGE),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return {
      fieldErrors: error?.flatten().fieldErrors,
    };
  }
  const { job_id } = await createJob(client, data);
  return redirect(`/jobs/${job_id}`);
};


export default function SubmitJobPage({ actionData }: Route.ComponentProps) {
  return (
    <div>
      <Hero title="Post a Job" subtitle="Reach out to the best developers in the world" />
      <Form className="max-w-screen-2xl flex flex-col items-center gap-10 mx-auto" method="post">
        <div className="grid grid-cols-3 gap-10 w-full">
          <InputPair
            id="position"
            label="Position"
            description="(40 characters max)"
            name="position"
            maxLength={40}
            type="text"
            required
            placeholder="i.e. Senior React Developer"
          />
          { actionData && "fieldErrors" in actionData && (
            <div className="text-red-500">
              {actionData.fieldErrors?.position?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <InputPair
            id="overview"
            label="Overview"
            description="(400 characters max)"
            name="overview"
            maxLength={400}
            type="text"
            required
            placeholder="i.e. We are looking for a senior react developer with 3 years of experience"
            textArea
          />
          { actionData && "fieldErrors" in actionData && (
            <div className="text-red-500">
              {actionData.fieldErrors?.overview?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <InputPair
            id="responsibilities"
            label="Responsibilities"
            description="(400 characters max, comma separated)"
            name="responsibilities"
            maxLength={400}
            type="text"
            required
            placeholder="i.e. Implement new features, Maintain code quality, etc."
            textArea
          />
          { actionData && "fieldErrors" in actionData && (
            <div className="text-red-500">
              {actionData.fieldErrors?.responsibilities?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <InputPair
            id="qualifications"
            label="Qualifications"
            description="(400 characters max, comma separated)"
            name="qualifications"
            maxLength={400}
            type="text"
            required
            placeholder="i.e. Implement new features, Maintain code quality, etc."
            textArea
          />
          { actionData && "fieldErrors" in actionData && (
            <div className="text-red-500">
              {actionData.fieldErrors?.qualifications?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <InputPair
            id="benefits"
            label="Benefits"
            description="(400 characters max, comma separated)"
            name="benefits"
            maxLength={400}
            type="text"
            required
            placeholder="i.e. Health insurance, 401k, etc."
            textArea
          />
          { actionData && "fieldErrors" in actionData && (
            <div className="text-red-500">
              {actionData.fieldErrors?.benefits?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <InputPair
            id="skills"
            label="Skills"
            description="(400 characters max, comma separated)"
            name="skills"
            maxLength={400}
            type="text"
            required
            placeholder="i.e. React, TypeScript, etc."
            textArea
          />
          { actionData && "fieldErrors" in actionData && (
            <div className="text-red-500">
              {actionData.fieldErrors?.skills?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <InputPair
            id="companyName"
            label="Company Name"
            description="(40 characters max)"
            name="companyName"
            maxLength={40}
            type="text"
            required
            placeholder="i.e. Google, Facebook, etc."
          />
          { actionData && "fieldErrors" in actionData && (
            <div className="text-red-500">
              {actionData.fieldErrors?.companyName?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <InputPair
            id="companyLogoUrl"
            label="Company Logo URL"
            description="(40 characters max)"
            name="companyLogoUrl"
            type="url"
            required
            placeholder="i.e. https://wemake.services/logo.png"
          />
          { actionData && "fieldErrors" in actionData && (
            <div className="text-red-500">
              {actionData.fieldErrors?.companyLogoUrl?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <InputPair
            id="companyLocation"
            label="Company Location"
            description="(40 characters max)"
            name="companyLocation"
            maxLength={40}
            type="text"
            required
            placeholder="i.e. San Francisco, CA, USA"
          />
          { actionData && "fieldErrors" in actionData && (
            <div className="text-red-500">
              {actionData.fieldErrors?.companyLocation?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <InputPair
            id="applyUrl"
            label="Apply URL"
            description="(40 characters max)"
            name="applyUrl"
            maxLength={40}
            type="url"
            required
            placeholder="i.e. https://wemake.services/apply"
          />
          { actionData && "fieldErrors" in actionData && (
            <div className="text-red-500">
              {actionData.fieldErrors?.applyUrl?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <SelectPair
            label="Job Type"
            description="Select the type of job you are posting"
            name="jobType"
            required
            placeholder="Select the type of job you are posting"
            options={JOB_TYPES.map((jobType) => ({
              label: jobType.label,
              value: jobType.value,
            }))}
          />
          { actionData && "fieldErrors" in actionData && (
            <div className="text-red-500">
              {actionData.fieldErrors?.jobType?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <SelectPair
            label="Job Location"
            description="Select the location of the job"
            name="jobLocation"
            required
            placeholder="Select the location of the job"
            options={LOCATION_TYPES.map((location) => ({
              label: location.label,
              value: location.value,
            }))}
          />
          { actionData && "fieldErrors" in actionData && (
            <div className="text-red-500">
              {actionData.fieldErrors?.jobLocation?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <SelectPair
            label="Salary Range"
            description="Select the salary range of the job"
            name="salaryRange"
            required
            placeholder="Select the salary range of the job"
            options={SALARY_RANGE.map((salaryRange) => ({
              label: salaryRange,
              value: salaryRange,
            }))}
          />
          { actionData && "fieldErrors" in actionData && (
            <div className="text-red-500">
              {actionData.fieldErrors?.salaryRange?.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
        </div>
        <Button type="submit" className="w-full max-w-sm" size="lg">Post jop for $100</Button>
      </Form>
    </div>
  );
} 