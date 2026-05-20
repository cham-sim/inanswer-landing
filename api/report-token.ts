import { createHmac, timingSafeEqual } from "crypto";

const SECRET = process.env.REPORT_TOKEN_SECRET ?? "dev-secret-change-in-prod";

export function makeReportToken(reportId: string, email: string): string {
  const payload = Buffer.from(JSON.stringify({ reportId, email })).toString("base64url");
  const sig = createHmac("sha256", SECRET).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function verifyReportToken(token: string): { reportId: string; email: string } | null {
  const dotIdx = token.lastIndexOf(".");
  if (dotIdx === -1) return null;
  const payload = token.slice(0, dotIdx);
  const sig = token.slice(dotIdx + 1);
  const expectedSig = createHmac("sha256", SECRET).update(payload).digest("base64url");
  try {
    if (!timingSafeEqual(Buffer.from(sig, "base64url"), Buffer.from(expectedSig, "base64url"))) return null;
  } catch {
    return null;
  }
  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString());
  } catch {
    return null;
  }
}
