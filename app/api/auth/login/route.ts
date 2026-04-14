import { NextRequest, NextResponse } from "next/server"

const validUserTypes = ["user", "technician", "admin"] as const
export type UserType = (typeof validUserTypes)[number]

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { userType, email, password, id } = body as {
    userType?: UserType
    email?: string
    password?: string
    id?: string
  }

  if (!userType || !email || !password) {
    return NextResponse.json({ error: "Missing login fields" }, { status: 400 })
  }

  if (!validUserTypes.includes(userType)) {
    return NextResponse.json({ error: "Invalid user type" }, { status: 400 })
  }

  const user = {
    id: id || email,
    email,
    userType,
    name: `${userType.charAt(0).toUpperCase()}${userType.slice(1)} User`,
  }

  return NextResponse.json({ user, token: "demo-backend-token" })
}
