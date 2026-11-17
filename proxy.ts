import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";

const previewCookieName = "maintenance-preview";
const previewQueryName = "maintenance_preview";
const previewLifetimeSeconds = 7 * 24 * 60 * 60;

function getPreviewExpiry(token: string, secret: string): number | null {
  const [expiresAtValue, signature, ...extra] = token.split(".");
  if (
    extra.length > 0 ||
    !/^\d{10}$/.test(expiresAtValue ?? "") ||
    !/^[A-Za-z0-9_-]{43}$/.test(signature ?? "")
  ) {
    return null;
  }

  const expiresAt = Number(expiresAtValue);
  const now = Math.floor(Date.now() / 1000);
  if (
    expiresAt <= now ||
    expiresAt > now + previewLifetimeSeconds ||
    secret.length < 32
  ) {
    return null;
  }

  const expectedSignature = createHmac("sha256", secret)
    .update(expiresAtValue)
    .digest();
  const suppliedSignature = Buffer.from(signature, "base64url");
  if (
    suppliedSignature.length !== expectedSignature.length ||
    !timingSafeEqual(suppliedSignature, expectedSignature)
  ) {
    return null;
  }

  return expiresAt;
}

export function proxy(request: NextRequest) {
  if (
    process.env.MAINTENANCE_MODE !== "true" ||
    request.nextUrl.pathname === "/maintenance"
  ) {
    return NextResponse.next();
  }

  const secret = process.env.MAINTENANCE_BYPASS_SECRET;
  const previewToken = request.nextUrl.searchParams.get(previewQueryName);
  if (previewToken !== null && ["GET", "HEAD"].includes(request.method)) {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.searchParams.delete(previewQueryName);
    const response = NextResponse.redirect(cleanUrl);
    response.headers.set("Cache-Control", "no-store");
    response.headers.set("Referrer-Policy", "no-referrer");

    const expiresAt = secret
      ? getPreviewExpiry(previewToken, secret)
      : null;
    if (expiresAt !== null) {
      const now = Math.floor(Date.now() / 1000);
      response.cookies.set(previewCookieName, previewToken, {
        httpOnly: true,
        secure: request.nextUrl.protocol === "https:",
        sameSite: "lax",
        path: "/",
        expires: new Date(expiresAt * 1000),
        maxAge: expiresAt - now,
      });
    }

    return response;
  }

  const previewCookie = request.cookies.get(previewCookieName)?.value;
  if (secret && previewCookie && getPreviewExpiry(previewCookie, secret) !== null) {
    return NextResponse.next();
  }

  const maintenanceUrl = request.nextUrl.clone();
  maintenanceUrl.pathname = "/maintenance";

  return NextResponse.rewrite(maintenanceUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
