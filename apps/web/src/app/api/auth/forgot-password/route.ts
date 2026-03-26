import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { createHmac, randomBytes } from "crypto";
import nodemailer from "nodemailer";

function createResetToken(email: string): string {
  const exp = Date.now() + 60 * 60 * 1000; // 1 hour
  const payload = Buffer.from(JSON.stringify({ email, exp })).toString("base64url");
  const secret = process.env.RESET_SECRET || process.env.SMTP_PASSWORD || "reset-secret";
  const sig = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ success: false, message: "Email is required." }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Look up user (don't reveal whether email exists)
    const users = await query<{ id: string; name: string }>(
      "SELECT id, name FROM users WHERE email = $1",
      [normalizedEmail]
    );

    if (users.length > 0) {
      const user = users[0];
      const token = createResetToken(normalizedEmail);
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
      const resetUrl = `${siteUrl}/auth/reset-password?token=${token}`;

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
        tls: { rejectUnauthorized: false },
      });

      await transporter.sendMail({
        from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
        to: normalizedEmail,
        subject: "Reset your AISprint password",
        html: `
          <div style="font-family:Arial,sans-serif;background:#f5f7fb;padding:40px;">
            <div style="max-width:600px;background:#fff;padding:40px;border-radius:10px;margin:auto;">
              <h2 style="margin-top:0;">Reset your password</h2>
              <p>Hi ${user.name},</p>
              <p>We received a request to reset your password. Click the button below to set a new password. This link expires in <strong>1 hour</strong>.</p>
              <p style="text-align:center;margin:32px 0;">
                <a href="${resetUrl}" style="background:#6366f1;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">Reset Password</a>
              </p>
              <p style="color:#6b7280;font-size:13px;">If you didn't request a password reset, you can safely ignore this email.</p>
              <p style="color:#6b7280;font-size:13px;">Or copy this link into your browser:<br/><a href="${resetUrl}" style="color:#6366f1;">${resetUrl}</a></p>
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;"/>
              <p style="color:#9ca3af;font-size:12px;margin:0;">AISprint Team</p>
            </div>
          </div>
        `,
      });
    }

    // Always return success to prevent email enumeration
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
