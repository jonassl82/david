import { Redis } from "@upstash/redis";

export const dynamic = "force-dynamic";

const redis = Redis.fromEnv();
const KEY = "david:overleg";

export async function GET() {
  const msgs = (await redis.get(KEY)) || [];
  return Response.json(msgs);
}

export async function POST(request) {
  const msgs = await request.json();
  if (!Array.isArray(msgs)) return Response.json({ error: "invalid" }, { status: 400 });
  await redis.set(KEY, msgs.slice(-200));
  return Response.json({ ok: true });
}
