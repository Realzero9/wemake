import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";
import { JobCard } from "../components/job-card";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from "../constants";
import { data, useSearchParams } from "react-router";
import { cn } from "~/lib/utils";
import { getJobs } from "../queries";
import type { Route } from "./+types/jobs-page";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";

export const meta = () => [
  { title: "Jobs | The NamYoon" },
  { name: "description", content: "Find your dream job at The NamYoon" },
];

const searchParamsSchema = z.object({
  type: z.enum(JOB_TYPES.map((type) => type.value) as [string, ...string[]]).optional(),
  location: z.enum(LOCATION_TYPES.map((location) => location.value) as [string, ...string[]]).optional(),
  salary: z.enum(SALARY_RANGE).optional(),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { success, data: parsedData } = searchParamsSchema.safeParse(Object.fromEntries(url.searchParams));
  if (!success) {
    throw data(
      {
        error_code: "INVALID_SEARCH_PARAMS",
        message: "Invalid search params",
      },
      {
        status: 400,
      }
    );
  }
  const { client, headers } = makeSSRClient(request);
  const jobs = await getJobs(client, {
    limit: 40,
    location: parsedData.location,
    type: parsedData.type,
    salary: parsedData.salary,
  });
  return { jobs, headers };
}

export default function JobsPage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const onFilterClick = (key: string, value: string) => {
    const current = searchParams.get(key);
    const nextValue = current === value ? null : value;
    if (nextValue) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="space-y-20">
      <Hero title="Jobs" subtitle="Companies looking for makers" />
      <div className="grid grid-cols-1 xl:grid-cols-6 gap-20 items-start">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:col-span-4 gap-5">
          {loaderData.jobs.map((job) => (
            <JobCard
              key={job.job_id}
              id={job.job_id}
              companyLogoUrl={job.company_logo}
              company={job.company_name}
              companyHq={job.company_location}
              postedAt={job.created_at}
              title={job.position}
              type={job.job_type}
              positionLocation={job.location}
              salary={job.salary_range}
            />
          ))}
        </div>
        <div className="xl:col-span-2 sticky top-20 flex flex-col gap-10">
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm test-muted-foreground font-bold">Type</h4>
            <div className="flex flex-wrap gap-2">
              {JOB_TYPES.map((type) => (
                <Button
                  variant="outline"
                  onClick={() => onFilterClick("type", type.value)}
                  className={cn(type.value === searchParams.get("type") ? "bg-accent" : "")}
                >
                  {type.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm test-muted-foreground font-bold">Location</h4>
            <div className="flex flex-wrap gap-2">
              {LOCATION_TYPES.map((location) => (
                <Button
                  variant="outline"
                  onClick={() => onFilterClick("location", location.value)}
                  className={cn(location.value === searchParams.get("location") ? "bg-accent" : "")}
                >
                  {location.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2.5">
            <h4 className="text-sm test-muted-foreground font-bold">Salary</h4>
            <div className="flex flex-wrap gap-2">
              {SALARY_RANGE.map((salary) => (
                <Button
                  variant="outline"
                  onClick={() => onFilterClick("salary", salary)}
                  className={cn(salary === searchParams.get("salary") ? "bg-accent" : "")}
                >
                  {salary}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 