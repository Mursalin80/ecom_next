import { NextResponse } from "next/server";

NextResponse;

export function GET() {
  return new NextResponse(JSON.stringify({ name: "hello" }));
}
