const pool = require("../db/dbConfig");
const queries = require("../db/queries/queries");
const checkUserLoggedIn = require("../middleware/checkUserLoggedIn");
const upload = require("../middleware/multer");
const parseFormData = require("../middleware/parseFormData");
const uploadImage = require("../middleware/uploadImage");

const addPost = (app) => {
  app.post(
    "/v1/post",
    checkUserLoggedIn,
    upload.single("image"),
    parseFormData,
    uploadImage,
    async (req, res) => {
      const { text, hashtags = [] } = req.body;
      const user_id = req.header("user_id");

      let data = {};

      if (text === undefined || text.length === 0) {
        return res
          .status(400)
          .json({ title: "Bad Request", message: "Text cannot be empty" });
      }

      const client = await pool.connect();
      try {
        await queries.startTransaction(client);

        data["text"] = text;
        data["user_id"] = user_id;

        let response = await queries.addPost(data, client);

        const post_id = response.id;

        if (req.imageUrl) {
          const imageResponse = await queries.addImage(post_id, req.imageUrl, client);
          response["image"] = imageResponse["image"];
        }

        for (const tag of hashtags) {
          let hashtag_id;
          const existingHashtags = await queries.getAllHashtags(tag, client);

          if (existingHashtags.length > 0) {
            hashtag_id = existingHashtags[0].id;
          } else {
            const newHashtag = await queries.addHashTag(tag, client);
            hashtag_id = newHashtag[0].id;
          }

          await queries.addPostHashTag(post_id, hashtag_id, client);
        }

        if(hashtags.length > 0) {
            response["hashtags"] = hashtags;
        }

        await queries.commitTransaction(client);

        return res
          .status(201)
          .json({ title: "Post Created Successfully", data: response });
      } catch (error) {
        await queries.rollbackTransaction(client);

        console.error(error);
        return res.status(500).json({
          title: "Internal Server Error",
          message:
            error.message.length != 0 ? error.message : "Something went wrong",
        });
      }
    }
  );
};

module.exports = addPost;
