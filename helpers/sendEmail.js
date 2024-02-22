// const nodemailer = require("nodemailer");
// const { BASE_URL, SENDER_EMAIL, EMAIL_PASSWORD } = process.env;

// const emailContentMaker = (verificationCode) => {
//   console.log(">>>> emailContentMaker worked");
//   return `<a href="${BASE_URL}/users/verify/${verificationCode}" target="_blank" rel="noopener nofollow noreferrer"> Click here to verify your email </a>`;
// };


// const config = {
//   host: "smtp.meta.ua",
//   port: 465,
//   secure: true,
//   auth: {
//     user: SENDER_EMAIL,
//     pass: EMAIL_PASSWORD,
//   },
// };

// const nodemailerFn = (verificationCode, email) => {
//   const transporter = nodemailer.createTransport(config);

//   const emailOptions = {
//     from: SENDER_EMAIL,
//     to: email,
//     subject: "test",
//     html: emailContentMaker(verificationCode),
//   };

//   transporter
//     .sendMail(emailOptions)
//     .then((info) => console.log(info))
//     .catch((err) => console.log(err));
// };

// module.exports = nodemailerFn;

const sgMail = require('@sendgrid/mail');

require('dotenv').config();
const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);
const sendEmail = async data => {
  const email = { ...data, from: 'caxar7dam@gmail.com' };
  await sgMail.send(email);
  return true;
};
module.exports = sendEmail;