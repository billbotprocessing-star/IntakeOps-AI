import { createHash, timingSafeEqual } from "node:crypto";
import type { z } from "zod";

export function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export function env(name: string): string {
  return process.env[name] ?? "";
}

/**
 * Checks the X-API-Key header shared with n8n. Returns an error response to
 * send back, or null when the caller is allowed through.
 *
 * Unlike the old backend this fails closed: with no INTAKEOPS_API_KEY set the
 * endpoints refuse every request instead of accepting anyone's.
 */
export function checkApiKey(req: Request): Response | null {
  const expected = env("INTAKEOPS_API_KEY");
  if (!expected) return json({ detail: "INTAKEOPS_API_KEY is not configured" }, 503);
  const given = req.headers.get("x-api-key") ?? "";
  const digest = (s: string) => createHash("sha256").update(s).digest();
  if (!timingSafeEqual(digest(given), digest(expected))) {
    return json({ detail: "Invalid API key" }, 401);
  }
  return null;
}

/** Parses a JSON body against a schema; on failure returns a 422 like FastAPI. */
export async function parseBody<S extends z.ZodType>(
  req: Request,
  schema: S,
): Promise<{ data: z.infer<S> } | { error: Response }> {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return { error: json({ detail: "Body must be valid JSON" }, 422) };
  }
  const result = schema.safeParse(raw);
  if (!result.success) {
    const detail = result.error.issues.map((i) => ({ loc: ["body", ...i.path], msg: i.message }));
    return { error: json({ detail }, 422) };
  }
  return { data: result.data };
}

/** Runs a side effect, logging instead of throwing so one outage doesn't fail the webhook. */
export async function attempt<T>(label: string, fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn();
  } catch (err) {
    console.error(`[${label}]`, err);
    return null;
  }
}
