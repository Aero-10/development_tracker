import { sendEmail } from "./sendEmail.js";

export const sendVerificationEmail = async (email, token) => {
  const link = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  await sendEmail({
    to: email,
    subject: "Verify your email",
    html: `
      <h2>Verify your email</h2>
      <p>Click the button below to verify your account:</p>
      <a href="${link}"
         style="display:inline-block;padding:10px 16px;
                background:#6366f1;color:white;
                border-radius:6px;text-decoration:none">
        Verify Email
      </a>
      <p>This link expires in 24 hours.</p>
    `
  });
};
