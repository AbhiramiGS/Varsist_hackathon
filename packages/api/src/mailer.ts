// import { env } from "@/env.mjs";
import type { EmailPayload } from "./types";
import nodemailer from "nodemailer";


const smtpOptions = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  // secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

const transporter = nodemailer.createTransport({
  ...smtpOptions,
});

export const sendEmail = async (data: EmailPayload) => {
  return await transporter.sendMail({
    from: {
      name: "SpringSense",
      address: process.env.SMTP_USER ?? "",
    },
    ...data,
  });
};
