import { Link, type MetaFunction } from "react-router";
import { ProductCard } from "../../features/products/components/product-card";
import { PostCard } from "../../features/community/components/post-card";
import { IdeaCard } from "../../features/ideas/components/idea-card";
import { JobCard } from "../../features/jobs/components/job-card";
import { TeamCard } from "../../features/teams/components/team-card";

import { Button } from "../components/ui/button";
import { getProductsByDateRange } from "~/features/products/queries";
import { DateTime } from "luxon";
import type { Route } from "./+types/home-page";
import { getPosts } from "~/features/community/queries";
import { getGptIdeas } from "~/features/ideas/queries";
import { getJobs } from "~/features/jobs/queries";
import { getTeams } from "~/features/teams/queries";
import { makeSSRClient } from "~/supa-client";

export const meta: MetaFunction = () => {
  return [
    { title: "Home | The NamYoon" },
    { name: "description", content: "The NamYoon is a platform for creating and sharing creative projects." },
  ];
};

//client loader
//export const clientLoader = async () => {

//server loader
export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const [products, posts, ideas, jobs, teams] = await Promise.all([
    getProductsByDateRange(client, {
      startDate: DateTime.now().startOf("day"),
      endDate: DateTime.now().endOf("day"),
      limit: 7,
    }),
    getPosts(client, {
      limit: 7,
      sorting: "newest",
    }),
    getGptIdeas(client, {
      limit: 7,
    }),
    getJobs(client, {
      limit: 11,
    }),
    getTeams(client, {
      limit: 7,
    }),
  ]);
  return { products, posts, ideas, jobs, teams, headers };
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="px-4 sm:px-6 md:px-8 space-y-10">
      <div className="flex flex-col items-center justify-center py-20">
        <img
          src="/logo-large.png"
          alt="The NamYoon Logo"
          className="w-full max-w-md object-contain"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">Today's Products</h2>
          <p className="text-lg md:text-xl font-light text-foreground">The best products made by our community</p>
          <Button variant="link" asChild>
            <Link to="/products/leaderboards" className="text-lg p-0">Explore All Products &rarr;</Link>
          </Button>
        </div>
        {loaderData.products
          .map((product, index) => (
            <ProductCard
              key={product.product_id}
              id={product.product_id}
              name={product.name}
              description={product.tagline}
              reviewsCount={product.reviews}
              viewCount={product.views}
              upvoteCount={product.upvotes}
            />
          ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">Latest Discussions</h2>
          <p className="text-lg md:text-xl font-light text-foreground">The latest discussions from our community</p>
          <Button variant="link" asChild>
            <Link to="/community" className="text-lg p-0">Explore All Discussions &rarr;</Link>
          </Button>
        </div>
        {loaderData.posts.map((post) => (
          <PostCard
            key={post.post_id}
            postId={post.post_id}
            title={post.title}
            authorName={post.author}
            authorAvatar={post.author_avatar}
            category={post.topic}
            postedAt={post.created_at}
            upvoteCount={post.upvotes}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">IdeasGPT</h2>
          <p className="text-lg md:text-xl font-light text-foreground">Find ideas for your next project</p>
          <Button variant="link" asChild>
            <Link to="/ideas" className="text-lg p-0">Explore All Ideas &rarr;</Link>
          </Button>
        </div>
        {loaderData.ideas.map((idea) => (
          <IdeaCard
            key={idea.gpt_idea_id}
            id={idea.gpt_idea_id}
            title={idea.idea}
            viewCount={idea.views}
            postedAt={idea.created_at}
            likeCount={idea.likes}
            claimed={idea.is_claimed}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">Latest Jobs</h2>
          <p className="text-lg md:text-xl font-light text-foreground">Find your dream job</p>
          <Button variant="link" asChild>
            <Link to="/jobs" className="text-lg p-0">Explore All Jobs &rarr;</Link>
          </Button>
        </div>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">Find a team mate</h2>
          <p className="text-lg md:text-xl font-light text-foreground">Join a team looking for a new member</p>
          <Button variant="link" asChild>
            <Link to="/teams" className="text-lg p-0">Explore All teams &rarr;</Link>
          </Button>
        </div>
        {loaderData.teams.map((team) => (
          <TeamCard
            key={team.team_id}
            id={team.team_id}
            username={team.team_leader.username}
            leaderAvatarUrl={team.team_leader.avatar}
            positions={team.roles.split(",")}
            projectDescription={team.product_description}
          />
        ))}
      </div>
    </div>
  );
} 