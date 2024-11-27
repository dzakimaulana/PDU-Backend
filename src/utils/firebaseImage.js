const { errorLogger } = require('../config/logger');
const { bucket } = require('../config/firebase/firebaseAdmin');
const bucketName = "images";

const producePublicURL = async (hexString, fileName) => {
  try {
    const imageBuffer = Buffer.from(hexString, 'hex');

    const file = bucket.file(`${bucketName}/${fileName}`);

    await file.save(imageBuffer, {
      metadata: {
        contentType: 'image/png',
      }
    });

    await file.makePublic();

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${bucketName}/${fileName}`;

    return { success: true, data: { url : publicUrl } };
  } catch (error) {
    errorLogger.error({
      message: error.message,
      stack: error.stack
    });
    return { success: false, message: error };
  }
} 

module.exports = {
  producePublicURL
};