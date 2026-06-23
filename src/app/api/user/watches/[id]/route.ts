import { NextRequest } from "next/server";
import { proxyUserRequest } from "@/lib/user-proxy";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return proxyUserRequest(request, `watches/${id}`, "DELETE");
}
