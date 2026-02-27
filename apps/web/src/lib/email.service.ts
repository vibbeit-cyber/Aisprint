import nodemailer from "nodemailer"
import type { Transporter } from "nodemailer"

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface LeadData {
  name: string
  email: string
  phone: string
  experience: string
  career_goal: string
  course_type: "ml-ai" | "prompt-engineering"
  created_at?: Date
}

interface EmailOptions {
  to: string
  subject: string
  html: string
  from?: string
}

// ─────────────────────────────────────────────
// Transporter (Singleton)
// ─────────────────────────────────────────────

let transporter: Transporter | null = null

function createTransporter(): Transporter {
  if (transporter) return transporter

  const host = process.env.SMTP_HOST
  const port = parseInt(process.env.SMTP_PORT || "465")
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASSWORD

  if (!host || !user || !pass) {
    throw new Error(
      "[Email Service] Missing SMTP configuration. Check environment variables."
    )
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
  })

  return transporter
}

// ─────────────────────────────────────────────
// Core Send Function
// ─────────────────────────────────────────────

async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    if (!options.to) return false

    const transport = createTransporter()

    const from =
      options.from ||
      `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`

    await transport.sendMail({
      from,
      to: options.to,
      subject: options.subject,
      html: options.html,
    })

    console.log("✅ Email sent successfully")
    return true
  } catch (error) {
    console.error("❌ Email sending failed:", error)
    return false
  }
}

// ─────────────────────────────────────────────
// Admin Notification Email
// ─────────────────────────────────────────────

export async function sendAdminNotification(
  lead: LeadData
): Promise<boolean> {
  const courseNames = {
    "ml-ai": "Machine Learning & AI",
    "prompt-engineering": "Prompt Engineering Program",
  }

  const courseName = courseNames[lead.course_type]

  const timestamp = new Date(
    lead.created_at || new Date()
  ).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  })

  const html = `
    <h2>New Course Application – ${courseName}</h2>
    <p><strong>Name:</strong> ${lead.name}</p>
    <p><strong>Email:</strong> ${lead.email}</p>
    <p><strong>Phone:</strong> ${lead.phone}</p>
    <p><strong>Experience:</strong> ${lead.experience}</p>
    <p><strong>Career Goal:</strong> ${lead.career_goal}</p>
    <p><strong>Submitted:</strong> ${timestamp}</p>
  `

  return sendEmail({
    to: process.env.ADMIN_EMAIL || "",
    subject: `New Course Application – ${courseName}`,
    html,
  })
}

// ─────────────────────────────────────────────
// User Confirmation Email (With Logo)
// ─────────────────────────────────────────────

export async function sendUserConfirmation(
  lead: LeadData
): Promise<boolean> {
  const courseNames = {
    "ml-ai": "Machine Learning & AI Program",
    "prompt-engineering": "Prompt Engineering Program",
  }

  const courseName = courseNames[lead.course_type]

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  </head>
  <body style="margin:0;padding:0;background:#f5f7fb;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">
          
          <table width="600" cellpadding="0" cellspacing="0"
            style="background:#ffffff;border-radius:12px;padding:40px;box-shadow:0 5px 20px rgba(0,0,0,0.05);">

            <!-- Logo -->
            <tr>
              <td align="left" style="padding-bottom:30px;">
                <img 
                  src="https://goaisprint.com/maillogo.png"
                  alt="AiSprint Logo"
                  width="150"
                  style="display:block;margin:0 auto;"
                />
              </td>
            </tr>

            <!-- Greeting -->
            <tr>
              <td style="font-family:Arial,Helvetica,sans-serif;
                         font-size:22px;
                         font-weight:700;
                         color:#111;">
                Hi ${lead.name},
              </td>
            </tr>

            <tr><td height="20"></td></tr>

            <!-- Main Content -->
            <tr>
              <td style="font-family:Arial,Helvetica,sans-serif;
                         font-size:16px;
                         color:#444;
                         line-height:1.7;">
                Thank you for applying to the 
                <strong>${courseName}</strong> at 
                <strong>Aisprint</strong>. 
                We have successfully received your application and our 
                <strong>Admissions Team</strong> is currently reviewing your profile.
              </td>
            </tr>

            <tr><td height="35"></td></tr>

            <!-- Section Title -->
            <tr>
              <td style="font-family:Arial,Helvetica,sans-serif;
                         font-size:18px;
                         font-weight:700;
                         color:#222;">
                What Happens Next?
              </td>
            </tr>

            <tr><td height="15"></td></tr>

            <!-- Bullet Points -->
            <tr>
              <td style="font-family:Arial,Helvetica,sans-serif;
                         font-size:15px;
                         color:#555;
                         line-height:1.8;">
                • Profile review by our <strong>AI Career Experts</strong><br/>
                • Personalized career counseling session<br/>
                • Program guidance and enrollment support
              </td>
            </tr>

            <tr><td height="35"></td></tr>

            <!-- Closing -->
            <tr>
              <td style="font-family:Arial,Helvetica,sans-serif;
                         font-size:15px;
                         color:#444;
                         line-height:1.7;">
                We will be in touch shortly with the next steps. 
                For any queries, feel free to contact our Admissions Team.
              </td>
            </tr>

            <tr><td height="40"></td></tr>

            <!-- Signature -->
            <tr>
              <td style="font-family:Arial,Helvetica,sans-serif;
                         font-size:15px;
                         color:#555;">
                Regards,<br/>
                <strong>AiSprint Admissions Team</strong>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `

  return sendEmail({
    to: lead.email,
    subject: `Application Received – ${courseName} | AiSprint`,
    html,
  })
}

// ─────────────────────────────────────────────
// Send Both Emails (Used by API Route)
// ─────────────────────────────────────────────

export async function sendLeadEmails(lead: LeadData): Promise<{
  adminSent: boolean
  userSent: boolean
}> {
  const [adminSent, userSent] = await Promise.all([
    sendAdminNotification(lead),
    sendUserConfirmation(lead),
  ])

  return { adminSent, userSent }
}