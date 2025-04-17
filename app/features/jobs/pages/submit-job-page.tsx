import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";
import { Card, CardContent, CardFooter } from "~/common/components/ui/card";
import { Form } from "react-router";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import { Textarea } from "~/common/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/common/components/ui/select";

export const meta = () => [
  { title: "Post a Job | wemake" },
  { name: "description", content: "Post a new job listing" },
];

export default function SubmitJobPage() {
  return (
    <div className="space-y-10 max-w-2xl mx-auto">
      <Hero title="Post a Job" subtitle="Share your opportunity with our community" />
      
      <Card>
        <Form className="space-y-8">
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Job Title</Label>
                <Input id="title" name="title" placeholder="e.g. Senior Frontend Developer" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" name="company" placeholder="e.g. Acme Inc." required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Select name="location">
                  <SelectTrigger>
                    <SelectValue placeholder="Select location type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="onsite">On-site</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="type">Employment Type</Label>
                <Select name="type">
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="salary">Salary Range</Label>
                <Input id="salary" name="salary" placeholder="e.g. $120k - $150k" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the role, requirements, and benefits..."
                  className="min-h-[200px]"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button type="submit" size="lg">
              Post Job
            </Button>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
} 