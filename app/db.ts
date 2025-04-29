import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// connection pool - drizzle은 지원하지 않음
const client = postgres(process.env.DATABASE_URL!, { prepare: false });

const db = drizzle(client, { logger: true });

export default db;
