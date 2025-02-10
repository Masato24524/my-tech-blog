import { NextRequest, NextResponse } from "next/server";
import { getBlogs } from "./utils";

export async function GET(request: NextRequest) {
  const data = await getBlogs();
  return NextResponse.json(data);
}
