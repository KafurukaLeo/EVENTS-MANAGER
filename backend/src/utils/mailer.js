import nodemailer from "nodemailer";
import env from "../config/env.js";

const transporter = nodemailer.createTransport({
  host: env.mailHost,
  port: env.mailPort,
  secure: env.mailPort === 465, // true for 465, false for other ports
  auth: {
    user: env.mailUser,
    pass: env.mailPassword,
  },
});

export const sendInvitationEmail = async (email, eventName, token) => {
  const invitationLink = `${env.clientUrl}/register?token=${token}`;
  
  const mailOptions = {
    from: `"Event Management" <${env.mailUser}>`,
    to: email,
    subject: `You are invited to: ${eventName}!`,
    html: `
      <h2>Hello!</h2>
      <p>You have been invited to the event: <strong>${eventName}</strong>.</p>
      <p>Please click the link below to confirm your attendance, register, and complete your payment:</p>
      <p><a href="${invitationLink}" style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; display: inline-block;">Register & Pay for Event</a></p>
      <p>Or copy this link into your browser: <br/> ${invitationLink}</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Invitation email sent successfully to ${email}. Message ID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`Failed to send invitation email to ${email}:`, error.message);
    return null;
  }
};
