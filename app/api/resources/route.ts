import { NextResponse } from "next/server"
import { resources } from "@/lib/server/data"

export async function GET() {
  return NextResponse.json(resources)
}
