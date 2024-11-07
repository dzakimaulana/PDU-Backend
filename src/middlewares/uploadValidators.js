const validateImageUpload = (req, res, next) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ error: 'No file was uploaded.' });
  }

  const imageFile = req.files.file;
  const allowedMimeTypes = ['image/jpeg', 'image/png'];
  
  if (!allowedMimeTypes.includes(imageFile.mimetype)) {
    return res.status(400).json({ error: 'Invalid file type. Only JPEG and PNG are allowed.' });
  }

  const maxFileSize = 500 * 1024;
  
  if (imageFile.size > maxFileSize) {
    return res.status(400).json({ error: `File size exceeds the 500KB limit.` });
  }

  next();
};

module.exports = validateImageUpload;
