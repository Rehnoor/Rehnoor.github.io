import { Resend } from "resend";

export async function sendContactEmail({ name, email, message }) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  return resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev",
    to: process.env.CONTACT_TO_EMAIL,
    replyTo: email,
    subject: `New message from ${name} via personal site`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });
}
