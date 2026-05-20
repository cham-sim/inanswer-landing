import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // RFC 8288 Link headers for agent discovery
  // https://www.rfc-editor.org/rfc/rfc8288
  response.headers.set(
    "Link",
    [
      '</sitemap.xml>; rel="sitemap"',
      "<https://inanswer.kr/consult>; rel=\"service-doc\"",
    ].join(", ")
  );

  return response;
}

export const config = {
  matcher: [
    // HTML 페이지에만 적용 (API, 정적 파일 제외)
    "/((?!api|_next/static|_next/image|favicon|.*\\.).*)",
  ],
};
