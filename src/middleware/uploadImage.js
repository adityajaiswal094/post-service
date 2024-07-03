const upload = require("./multer");
const cloudinary = require("../utils/cloudinary");

const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    req.imageUrl = result.secure_url;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      title: "Internal Server Error",
      message:
        error.message.length != 0 ? error.message : "Something went wrong",
    });
  }
};

module.exports = uploadImage;
