"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.forwardemail.net",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM",
    pass: "REPLACE-WITH-YOUR-GENERATED-PASSWORD",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

// main().catch(console.error);

// var mailConfig;
// if (process.env.NODE_ENV === 'production' ){
//     // all emails are delivered to destination
//     mailConfig = {
//         host: 'smtp.sendgrid.net',
//         port: 587,
//         auth: {
//             user: 'real.user',
//             pass: 'verysecret'
//         }
//     };
// } else {
//     // all emails are catched by ethereal.email
//     mailConfig = {
//         host: 'smtp.ethereal.email',
//         port: 587,
//         auth: {
//             user: 'ethereal.user@ethereal.email',
//             pass: 'verysecret'
//         }
//     };
// }
// let transporter = nodemailer.createTransport(mailConfig);
// // messages are either sent (production) or catched (development)
// transporter.sendMail(...)

// Last Example

// Use at least Nodemailer v4.1.0
// const nodemailer = require('nodemailer');

// // Generate SMTP service account from ethereal.email
// nodemailer.createTestAccount((err, account) => {
//     if (err) {
//         console.error('Failed to create a testing account. ' + err.message);
//         return process.exit(1);
//     }

//     console.log('Credentials obtained, sending message...');

//     // Create a SMTP transporter object
//     let transporter = nodemailer.createTransport({
//         host: account.smtp.host,
//         port: account.smtp.port,
//         secure: account.smtp.secure,
//         auth: {
//             user: account.user,
//             pass: account.pass
//         }
//     });

//     // Message object
//     let message = {
//         from: 'Sender Name <sender@example.com>',
//         to: 'Recipient <recipient@example.com>',
//         subject: 'Nodemailer is unicode friendly ✔',
//         text: 'Hello to myself!',
//         html: '<p><b>Hello</b> to myself!</p>'
//     };

//     transporter.sendMail(message, (err, info) => {
//         if (err) {
//             console.log('Error occurred. ' + err.message);
//             return process.exit(1);
//         }

//         console.log('Message sent: %s', info.messageId);
//         // Preview only available when sending through an Ethereal account
//         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//     });
// });
