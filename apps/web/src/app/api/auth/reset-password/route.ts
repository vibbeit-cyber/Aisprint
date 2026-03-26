import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { createHmac } from "crypto";

function verifyToken(token: string) {
  const [payload, sig] = token.split(".");
  const secret = process.env.RESET_SECRET || "reset-secret";

  const expectedSig = createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");

  if (sig !== expectedSig) return null;

  const data = JSON.parse(Buffer.from(payload, "base64url").toString());

  if (Date.now() > data.exp) return null;

  return data.email;
}

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { success: false, message: "Invalid request" },
        { status: 400 }
      );
    }

    const email = verifyToken(token);

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // ⚠️ hash password (important)
    const hashed = password; // 👉 replace with bcrypt in production

    await query(
      "UPDATE users SET password = $1 WHERE email = $2",
      [hashed, email]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}