import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: 'info@jadeh.co',
    pass: 'EE_TJq+qBB_m3B_',
  },
  logger: true,
});

export const sendVerificationEmail = async (
  address: string,
  code: number,
): Promise<SMTPTransport.SentMessageInfo> => {
  return await transporter.sendMail({
    from: 'info@jadeh.co',
    to: address,
    subject: 'Welcome To My Test Site',
    text: `Your Validation Code Is: ${code}`,
  });
};
