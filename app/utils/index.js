/**
 * Created by ccc on 6/19/17.
 */

import nodemailer from 'nodemailer';
import configs from '../configs';

const transporter = nodemailer.createTransport(configs.smtp);
export async function sendInvitation(email, token, callback) {
  const message = {
    from: `no-reply <${configs.smtp.auth.user}>`,
    to: email,
    subject: 'ipcheck邀请',
    text: 'invitations: ',
    html: `<p><strong>hello ipcheck invitations</strong></p><p>token: ${token}</p>`,
  };
  await transporter.sendMail(message);
}
