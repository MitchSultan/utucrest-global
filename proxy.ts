import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (
    process.env.MAINTENANCE_MODE !== "true" ||
    request.nextUrl.pathname === "/maintenance"
  ) {
    return NextResponse.next();
  }

  const maintenanceUrl = request.nextUrl.clone();
  maintenanceUrl.pathname = "/maintenance";

  return NextResponse.rewrite(maintenanceUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
