import { NextRequest } from "next/server";
import { proxyUserRequest } from "@/lib/user-proxy";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return proxyUserRequest(_request, `saved/${id}`, "POST");
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return proxyUserRequest(_request, `saved/${id}`, "DELETE");
}
