import { createHmac } from "node:crypto";

const secret = process.env.MAINTENANCE_BYPASS_SECRET;
const baseUrl = process.argv[2];

if (!secret || secret.length < 32) {
  console.error("Set MAINTENANCE_BYPASS_SECRET to a secret of at least 32 characters.");
  process.exit(1);
}

if (!baseUrl) {
  console.error("Usage: npm run maintenance:link -- https://your-site.example");
  process.exit(1);
}

const url = new URL(baseUrl);
if (url.protocol !== "https:" && !["localhost", "127.0.0.1"].includes(url.hostname)) {
  console.error("Use an HTTPS URL (HTTP is allowed only for localhost).");
  process.exit(1);
}

const expiresAt = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;
const expiry = String(expiresAt);
const signature = createHmac("sha256", secret).update(expiry).digest("base64url");

url.searchParams.set("maintenance_preview", `${expiry}.${signature}`);

console.log(`Preview link (expires ${new Date(expiresAt * 1000).toISOString()}):`);
console.log(url.toString());
