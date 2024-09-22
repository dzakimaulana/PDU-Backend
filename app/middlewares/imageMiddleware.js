const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png'];
  const extensionName = /\.(jpg|jpeg|png)$/i.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.includes(file.mimetype);

  if (extensionName && mimetype) {
    cb(null, true);
  } else {
    const error = new Error("Only images with .jpg, .jpeg, or .png extensions are allowed");
    error.status = 400;
    cb(error, false);
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 500 * 1024 // 500 KB limit
  }
});

module.exports = upload;