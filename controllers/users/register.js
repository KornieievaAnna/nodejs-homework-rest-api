const bcrypt = require("bcrypt");

const { User } = require("../../models/user");

const { HttpError } = require("../../helpers");

const { ctrlWrapper } = require("../../decorators");

const gravatar = require("gravatar");

// const fs = require("fs/promises");

// const path = require("path");

// const contactPath = path.join(__dirname, "../", "public", "avatars"); к апдейту аватара

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, {
    s: "80", // размер изображения (пиксели)
    r: "g", // рейтинг изображения
    d: "mm", // значок по умолчанию, если не найдено изображение
  });
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
    avatarURL,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};

// // console.log(req.body);
// // console.log(req.file);
// const { path: oldPath, filename } = req.file;
// const newPath = path.join(contactPath, filename);
// await fs.rename(oldPath, newPath);
// const anatar = path.join("public", "contacts", filename);
