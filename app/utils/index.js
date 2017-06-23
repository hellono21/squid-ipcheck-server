/**
 * Created by ccc on 6/19/17.
 */

import nodemailer from 'nodemailer';
import configs from '../configs';

const transporter = nodemailer.createTransport(configs.smtp);
export async function sendInvitation(email, token, callback) {
  const registerUrl = `${configs.server.hostName}/register?token=${token}`;
  const message = {
    from: `no-reply <${configs.smtp.auth.user}>`,
    to: email,
    subject: 'ipcheck邀请',
    text: 'invitations: ',
    html: `<p><strong>hello ipcheck invitations</strong></p>           
           <p><a href="${registerUrl}" target="_blank">注册</a></p>
           <p>${registerUrl}</p>
           `,
  };
  await transporter.sendMail(message);
}
