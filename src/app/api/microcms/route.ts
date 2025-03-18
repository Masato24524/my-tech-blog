export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { getBlogs } from "./utils";

export async function GET(request: NextRequest) {
  try {
    const data = await getBlogs();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
