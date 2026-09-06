import { Redis } from "@upstash/redis";
import { createHash, timingSafeEqual } from "crypto";

export const dynamic = "force-dynamic";

const redis = Redis.fromEnv();
const KEY = "david:pw";

const hash = (pw) => createHash("sha256").update(String(pw)).digest("hex");

// Een vast wachtwoord via de omgevingsvariabele heeft altijd voorrang.
// Staat die niet ingesteld, dan geldt het wachtwoord dat in Redis is opgeslagen.
const envHash = () =>
  process.env.DAVID_PASSWORD ? hash(process.env.DAVID_PASSWORD) : null;

function sameHash(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

// Vertelt de app of er al een wachtwoord bestaat (login) of niet (eenmalig instellen).
export async function GET() {
  const stored = envHash() || (await redis.get(KEY));
  return Response.json({ configured: Boolean(stored) });
}

export async function POST(request) {
  const { password } = await request.json().catch(() => ({}));
  if (typeof password !== "string" || password.length < 4) {
    return Response.json({ ok: false, error: "Minimaal 4 tekens" }, { status: 400 });
  }

  const stored = envHash() || (await redis.get(KEY));

  // Eerste keer: leg het wachtwoord vast zodat het op elk apparaat blijft werken.
  if (!stored) {
    await redis.set(KEY, hash(password));
    return Response.json({ ok: true });
  }

  if (!sameHash(stored, hash(password))) {
    return Response.json({ ok: false, error: "Onjuist wachtwoord" }, { status: 401 });
  }
  return Response.json({ ok: true });
}
