import nodemailer from "nodemailer";

import env from "./env.js";

const transporter = nodemailer.createTransport({
  host: env.mailHost,
  port: env.mailPort,

  secure: env.mailPort === 465,

  auth: {
    user: env.mailUser,
    pass: env.mailPassword,
  },
});

export default transporter;
