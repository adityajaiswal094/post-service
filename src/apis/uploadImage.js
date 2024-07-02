const upload = require("../middleware/multer");
const cloudinary = require("../utils/cloudinary");

const uploadImage = (app) => {
  app.post("/uploadimage", upload.single("image"), async (req, res) => {
    cloudinary.uploader.upload(req.file.path, (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({
          title: "Internal Server Error",
          message: error.message.length != 0 ? error.message : "Something went wrong",
        });
      }

      res.status(200).json({
        title: "Image Uploaded Successfully",
        data: result
      });
    });
  });
};

module.exports = uploadImage;