const cloudinary = require('../config/cloudinary');
const ApiError = require('../utils/ApiError');

const imageService = {
  uploadImage(file) {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'baby-hub/products' },
        (err, result) => {
          if (err) return reject(new ApiError(502, `Image upload failed: ${err.message}`));
          resolve({ url: result.secure_url, publicId: result.public_id });
        }
      );
      stream.end(file.buffer);
    });
  },

  async deleteImage(publicId) {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (err) {
      // Non-fatal: a stale Cloudinary asset shouldn't block the product operation.
      console.error(`Failed to delete Cloudinary image ${publicId}:`, err.message);
    }
  },
};

module.exports = imageService;
