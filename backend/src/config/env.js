import dotenv from "dotenv";

dotenv.config();

const env = {
  port: Number(process.env.PORT) || 5000,

  databaseUrl: process.env.DATABASE_URL,

  jwtSecret: process.env.JWT_SECRET,

  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",

  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",

  mailHost: process.env.MAIL_HOST,

  mailPort: Number(process.env.MAIL_PORT) || 587,

  mailUser: process.env.MAIL_USER,

  mailPassword: process.env.MAIL_PASSWORD,
};

export default env;
