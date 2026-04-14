import { NextRequest, NextResponse } from "next/server"
import { bookings } from "@/lib/server/data"

export async function GET() {
  return NextResponse.json(bookings)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const {
    resourceId,
    resourceName,
    date,
    startTime,
    endTime,
    duration,
    eventName,
    purpose,
    attendees,
  } = body as {
    resourceId?: number
    resourceName?: string
    date?: string
    startTime?: string
    endTime?: string
    duration?: number
    eventName?: string
    purpose?: string
    attendees?: number
  }

  if (
    resourceId == null ||
    !resourceName ||
    !date ||
    !startTime ||
    !endTime ||
    duration == null ||
    !eventName ||
    attendees == null
  ) {
    return NextResponse.json({ error: "Invalid booking payload" }, { status: 400 })
  }

  const booking = {
    id: Date.now(),
    resourceId,
    resourceName,
    date,
    startTime,
    endTime,
    duration,
    eventName,
    purpose: purpose || "",
    attendees,
    status: "pending" as const,
    createdAt: new Date().toISOString(),
  }

  bookings.unshift(booking)
  return NextResponse.json(booking, { status: 201 })
}
