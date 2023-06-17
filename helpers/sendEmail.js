// const Mailjet = require("node-mailjet");
const nodemailer = require("nodemailer");

require("dotenv").config();

const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: UKR_NET_EMAIL };
  await transport.sendMail(email);
  return true;
}

// const emaill = {
//   from: UKR_NET_EMAIL,
//   to: "annet1405@gmail.com",
//   subject: "Verify your email",
//   html: '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
// };

// transport
//   .sendMail(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));



  module.exports = sendEmail;

// const { MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE, MJ_SENDER_EMAIL } = process.env;

// const mailjet = new Mailjet({
//   apiKey: MJ_APIKEY_PUBLIC,
//   apiSecret: MJ_APIKEY_PRIVATE
// });

// /* const data ={
//   To:"",
//   subject: "",
//   html: ""
// }
// */
// const sendEmail = async(data)=> {
//   await mailjet.post("send", { version: "v3.1" }).request({
//     Messages: [
//       {
//         From: {
//           Email: MJ_SENDER_EMAIL,
//           // Name: "Mailjet Pilot",
//         },
//         To: [
//           {
//             Email: data.to,
//             // Name: "pipav",
//           },
//         ],
//         Subject: data.subject,
//         // TextPart:
//         //   "Dear pipav, welcome to Mailjet! May the delivery force be with you!",
//         HTMLPart: data.html,
//       },
//     ],
//   });
//   return true;
// }

// QYKbYmeR50B3MpSz;

// module.exports = sendEmail;
