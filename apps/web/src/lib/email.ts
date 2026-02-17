import nodemailer from "nodemailer";
import path from "path";

// Check if SMTP is configured
const isEmailEnabled =
  process.env.SMTP_HOST &&
  process.env.SMTP_PORT &&
  process.env.SMTP_USER &&
  process.env.SMTP_PASS

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendApplicationEmail(data: {
  name: string;
  email: string;
  course: string;
}) {
  const { name, email, course } = data;

  // Skip email if not configured
  if (!isEmailEnabled) {
    console.log('[Email Disabled] SMTP not configured in environment')
    return
  }

  //const logoPath = path.join(process.cwd(), "public", "logo.png");

  // Email to user
  await transporter.sendMail({
    from: `"AiSprint Admissions" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `Application Received — ${course}`,

    html: `
      <div style="font-family: Arial, sans-serif; line-height:1.6; max-width:600px; margin:auto;">

        <div style="text-align:center; margin-bottom:20px;">
          <img src="cid:aisprintlogo" alt="AiSprint" style="height:60px;" />
        </div>

        <h2>Hi ${name},</h2>

        <p>Thank you for applying for <strong>${course}</strong> at <strong>AiSprint</strong>.</p>

        <p>Our admissions team will contact you shortly with the next steps.</p>

        <br/>

        <p><strong>What happens next?</strong></p>
        <ul>
          <li>Profile review by our AI career experts</li>
          <li>Personalized counseling session</li>
          <li>Program enrollment guidance</li>
        </ul>

        <br/>

        <p>We’re excited to help you accelerate your career with AI 🚀</p>

        <p>
          Regards,<br/>
          <strong>AiSprint Admissions Team</strong>
        </p>
      </div>

    `,
  });

  // Email to admin
  await transporter.sendMail({
    from: `"AiSprint Leads" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Lead — ${course}`,
    html: `
      <h3>New Application Submitted — AiSprint</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Course:</strong> ${course}</p>
    `,
  });
}
