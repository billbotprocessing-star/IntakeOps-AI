import type { Config } from "@netlify/functions";
import { json } from "../lib/http";

export default async () => json({ status: "ok" });

export const config: Config = { path: "/api/health", method: "GET" };
