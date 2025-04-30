import { defineConfig } from "drizzle-kit";

// drizzel kit 이 정보 확인할때 참조하는 파일
export default defineConfig({
    schema: "./app/features/**/schema.ts",
    out: "./app/sql/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
