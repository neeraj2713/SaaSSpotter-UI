import { NextRequest, NextResponse } from "next/server";

function getBackendUrl(): string {
  const url = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    throw new Error("API_URL is not configured");
  }
  return url.replace(/\/$/, "");
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path } = await params;
    const backendUrl = getBackendUrl();
    const search = request.nextUrl.search;
    const apiPath = path.join("/");
    const res = await fetch(`${backendUrl}/api/v1/${apiPath}${search}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    const body = await res.text();
    return new NextResponse(body, {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return NextResponse.json(
      { detail: "Failed to reach API" },
      { status: 502 },
    );
  }
}
