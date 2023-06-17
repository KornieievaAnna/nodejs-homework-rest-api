const bcrypt = require("bcrypt");

const { nanoid } = require("nanoid");

const { User } = require("../../models/user");

const { HttpError, sendEmail } = require("../../helpers");

const { ctrlWrapper } = require("../../decorators");

const gravatar = require("gravatar");

const { PROJECT_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();

  const avatarURL = gravatar.url(email, {
    s: "80", // размер изображения (пиксели)
    r: "g", // рейтинг изображения
    d: "mm", // значок по умолчанию, если не найдено изображение
  });
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target=_blank href="${PROJECT_URL}/api/auth/verify/${verificationToken}">Click to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  // const sendEmail = {
  //   from: UKR_NET_EMAIL,
  //   to: email,
  //   subject: "Verify your email",
  //   html: '<h3>Dear User, welcome to HELL!</h3><br />May the delivery force be with you!',
  // };

  // await transport
  //   .sendMail(sendEmail)
  //   .then(() => console.log("Email send success"))
  //   .catch((error) => console.log(error.message));

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
    avatarURL,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
