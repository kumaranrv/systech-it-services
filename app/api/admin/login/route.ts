// app/api/admin/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, generateToken, COOKIE_NAME } from "@/lib/adminAuth";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = (await request.json()) as { password?: string };
    const password =
      typeof body.password === "string" ? body.password.trim() : "";

    if (!password || !(await verifyPassword(password))) {
      return NextResponse.json(
        { message: "Invalid password." },
        { status: 401 },
      );
    }

    const token = await generateToken();
    const response = NextResponse.json({ ok: true });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      // Session cookie — expires when the browser is closed
      maxAge: 60 * 60 * 8, // 8 hours max
    });

    return response;
  } catch {
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 },
    );
  }
}
