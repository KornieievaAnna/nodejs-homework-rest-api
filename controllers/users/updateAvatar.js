const { ctrlWrapper } = require("../../decorators");

const { HttpError } = require("../../helpers");

const path = require("path");

const fs = require("fs/promises");

const { User } = require("../../models/user");

const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  Jimp.read(resultUpload, (error, image) => {
    if (error) throw HttpError(404, "Avatar not found");
    image.resize(250, 250).write(resultUpload);
  });
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = { updateAvatar: ctrlWrapper(updateAvatar) };
