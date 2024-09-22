const imageChecker = (req, res, next) => {
  if (!req.files) {
    return res.status(400).json({ message: 'No file was uploaded.' });
  }

  const imageFile = req.files.file;
  const allowedTypes = ['image/jpeg', 'image/png'];
  if (!allowedTypes.includes(imageFile.mimetype)) {
    return res.status(400).json({ message: 'Only JPEG and PNG files are allowed.' });
  }

  const allowedSize = 500 * 1024 // 500 KB
  if (imageFile.size > allowedSize) {
    return res.status(400).json({ message: 'File size exceeds 500KB limit.' });
  }
  next();
}

module.exports = imageChecker;