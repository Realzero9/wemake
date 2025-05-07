import { data, Outlet } from "react-router";
import { z } from "zod";
import type { Route } from "./+types/leaderboard-layout";

const searchParamsSchema = z.object({
    page: z.coerce.number().min(1).optional().default(1),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
    const url = new URL(request.url);
    const { success, data: parsedPage } = searchParamsSchema.safeParse(Object.fromEntries(url.searchParams));
    if (!success) {
        throw data(
            {
            message: "Invalid page",
            error_code: "INVALID_PAGE",
            }, 
            { status: 400 }
        );
    }
    return {
        page: parsedPage.page,
    };
}

export default function LeaderboardLayout() {
    return <Outlet />;
}