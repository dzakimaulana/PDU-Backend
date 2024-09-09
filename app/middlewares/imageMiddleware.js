const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedType = /jpg|jpeg|png/;
  const extensionName = allowedType.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedType.test(file.mimetype);

  if (extensionName && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only images with .jpg, .jpeg, or .png extensions are allowed"), false);
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