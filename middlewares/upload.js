const multer = require("multer");

const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const storage = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const newName = `${uniquePrefix}_${file.originalname}`;
    cb(null, newName);
  },
});

const limits = {
  fileSize: 1024 * 1024,
};

// файлы с каким расширением нужно сохранять

const upload = multer({
  storage,
  limits,
  // fileFilter,
});

module.exports = upload;