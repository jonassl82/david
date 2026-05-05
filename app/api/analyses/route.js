import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
const KEY = "david:analyses";

export async function GET() {
  const list = (await redis.get(KEY)) || [];
  return Response.json(list);
}

export async function POST(request) {
  const item = await request.json();
  if (!item || !item.id) return Response.json({ error: "invalid" }, { status: 400 });
  const current = (await redis.get(KEY)) || [];
  const next = [item, ...current.filter((a) => a.id !== item.id)].slice(0, 50);
  await redis.set(KEY, next);
  return Response.json(next);
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ error: "missing id" }, { status: 400 });
  const current = (await redis.get(KEY)) || [];
  const next = current.filter((a) => a.id !== id);
  await redis.set(KEY, next);
  return Response.json(next);
}
