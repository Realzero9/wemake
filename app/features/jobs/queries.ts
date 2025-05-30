import type { SupabaseClient } from "@supabase/supabase-js";

export const getJobs = async (
    client: SupabaseClient,
    { limit, location, type, salary }: {
        limit: number;
        location?: string;
        type?: string;
        salary?: string;
    }
) => {
    const baseQuery = client
        .from("jobs")
        .select(`
            job_id,
            position,
            overview,
            company_name,
            company_logo,
            company_location,
            job_type,
            location,
            salary_range,
            created_at
        `)
        .limit(limit);
    if (location) {
        baseQuery.eq("location", location);
    }
    if (type) {
        baseQuery.eq("job_type", type);
    }
    if (salary) {
        baseQuery.eq("salary_range", salary);
    }
    const {data, error} = await baseQuery;
    if (error) throw new Error(error.message);
    return data;
}

export const getJobById = async (
    client: SupabaseClient,
    { jobId }: { jobId: number }
) => {
    const {data, error} = await client
        .from("jobs")
        .select("*")
        .eq("job_id", jobId)
        .single();
    if (error) throw new Error(error.message);
    return data;
}
