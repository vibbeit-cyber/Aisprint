import nodemailer from 'nodemailer'

// Ensure SMTP config exists
const isEmailEnabled =
  process.env.SMTP_HOST &&
  process.env.SMTP_PORT &&
  process.env.SMTP_USER &&
  process.env.SMTP_PASS &&
  process.env.ADMIN_EMAIL

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendApplicationEmail(data: {
  name: string
  email: string
  course: string
}) {
  if (!isEmailEnabled) {
    console.log('[Email Disabled] SMTP not configured')
    return
  }

  const { name, email, course } = data

  // 1️⃣ Email to User
  await transporter.sendMail({
    from: `"AiSprint Admissions" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `Application Received — ${course}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
        <h2>Hi ${name},</h2>
        <p>Thank you for applying for <strong>${course}</strong> at <strong>AiSprint</strong>.</p>
        <p>Our admissions team will contact you shortly with the next steps.</p>

        <br/>

        <p><strong>What happens next?</strong></p>
        <ul>
          <li>Profile review</li>
          <li>Personalized counseling session</li>
          <li>Enrollment guidance</li>
        </ul>

        <br/>

        <p>We’re excited to help you accelerate your AI career 🚀</p>

        <p>
          Regards,<br/>
          <strong>AiSprint Admissions Team</strong>
        </p>
      </div>
    `,
  })

  // 2️⃣ Email to Admin
  await transporter.sendMail({
    from: `"AiSprint Leads" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Lead — ${course}`,
    html: `
      <h3>New Application Submitted</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Course:</strong> ${course}</p>
      <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
    `,
  })
}
