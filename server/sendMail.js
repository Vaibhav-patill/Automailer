import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

/**
 * Sends personalized emails one by one
 * @param {Object} params
 * @param {Array} params.emails - [{ email, company }]
 * @param {string} params.subject - Email subject (can include {{company}})
 * @param {string} params.template - Email body (can include {{company}})
 * @param {string} params.resumePath - Uploaded resume file path
 */
export async function sendBulkMail({
  emails,
  subject,
  template,
  resumePath,
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS, // Gmail App Password
    },
  });

  for (let i = 0; i < emails.length; i++) {
    const hr = emails[i];

    // Personalize subject and body
    const personalizedSubject = subject.replace(
      /{{company}}/g,
      hr.company || ""
    );

    const personalizedBody = template.replace(
      /{{company}}/g,
      hr.company || ""
    );

    await transporter.sendMail({
      from: `"Vaibhav Patil" <${process.env.EMAIL}>`,
      to: hr.email,
      subject: personalizedSubject,
      text: personalizedBody,
      attachments: [
        {
          filename: "Resume.pdf",
          path: resumePath,
        },
      ],
    });

    console.log(
      `✅ ${i + 1}/${emails.length} Mail sent to ${hr.email}`
    );
  }
}
