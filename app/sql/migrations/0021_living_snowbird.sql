ALTER TABLE "jobs" ALTER COLUMN "job_type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."job_type";--> statement-breakpoint
CREATE TYPE "public"."job_type" AS ENUM('full-time', 'part-time', 'freelance', 'internship');--> statement-breakpoint
ALTER TABLE "jobs" ALTER COLUMN "job_type" SET DATA TYPE "public"."job_type" USING "job_type"::"public"."job_type";--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "product_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "profile_id" SET NOT NULL;