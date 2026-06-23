import { NextRequest } from "next/server";
import { proxyUserRequest } from "@/lib/user-proxy";

export async function GET(request: NextRequest) {
  return proxyUserRequest(request, "saved");
}
