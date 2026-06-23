import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

function getBackendUrl(): string {
  const url = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;
  if (!url) throw new Error("API_URL is not configured");
  return url.replace(/\/$/, "");
}

export async function proxyUserRequest(
  request: NextRequest,
  path: string,
  method = "GET",
  bodyRequest?: NextRequest,
) {
  const { userId, getToken } = await auth();
  if (!userId) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  const token = await getToken();
  if (!token) {
    return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
  }

  const backendUrl = getBackendUrl();
  const search = request.nextUrl.search;
  const init: RequestInit = {
    method,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  };

  if (bodyRequest && method !== "GET" && method !== "DELETE") {
    const body = await bodyRequest.text();
    if (body) {
      init.headers = {
        ...init.headers,
        "Content-Type": "application/json",
      };
      init.body = body;
    }
  }

  try {
    const res = await fetch(`${backendUrl}/api/v1/user/${path}${search}`, init);
    const text = await res.text();
    return new NextResponse(text || null, {
      status: res.status,
      headers: text ? { "Content-Type": "application/json" } : undefined,
    });
  } catch {
    return NextResponse.json(
      { detail: "Failed to reach API" },
      { status: 502 },
    );
  }
}
