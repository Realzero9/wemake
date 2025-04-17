import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";
import { Card, CardContent, CardHeader } from "~/common/components/ui/card";
import { BadgeIcon, BuildingIcon, MapPinIcon } from "lucide-react";
import { Badge } from "~/common/components/ui/badge";

export const meta = () => [
  { title: "Job Details | wemake" },
  { name: "description", content: "View job details and apply" },
];

export default function JobPage() {
  return (
    <div className="space-y-10">
      <Hero title="Senior Frontend Developer" />
      
      <div className="grid md:grid-cols-[1fr,300px] gap-10">
        <div className="space-y-10">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 text-muted-foreground">
                <BuildingIcon className="size-4" />
                <span>Company Name</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPinIcon className="size-4" />
                  <span>Remote</span>
                </div>
                <div className="flex items-center gap-1">
                  <BadgeIcon className="size-4" />
                  <span>Full-time</span>
                </div>
              </div>
              <Badge>$120k - $150k</Badge>
            </CardContent>
          </Card>

          <div className="space-y-5">
            <h2 className="text-2xl font-bold">About the Role</h2>
            <div className="prose prose-neutral dark:prose-invert">
              <p>
                We are looking for a Senior Frontend Developer to join our team...
              </p>
              <h3>Requirements</h3>
              <ul>
                <li>5+ years of experience with React</li>
                <li>Strong understanding of TypeScript</li>
                <li>Experience with modern frontend tools</li>
              </ul>
              <h3>Benefits</h3>
              <ul>
                <li>Competitive salary</li>
                <li>Remote work</li>
                <li>Flexible hours</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <Card>
            <CardContent className="pt-6">
              <Button className="w-full" size="lg">
                Apply Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 