const pool = require("../db/dbConfig");
const queries = require("../db/queries/queries");
const checkUserLoggedIn = require("../middleware/checkUserLoggedIn");
const upload = require("../middleware/multer");
const parseFormData = require("../middleware/parseFormData");
const uploadImage = require("../middleware/uploadImage");

const editPost = (app) => {
  app.put(
    "/v1/post/:id",
    checkUserLoggedIn,
    upload.single("image"),
    parseFormData,
    uploadImage,
    async (req, res) => {
      const { text, hashtags = [] } = req.body;
      const user_id = req.header("user_id");
      const post_id = req.params.id;

      if (post_id === undefined) {
        return res
          .status(404)
          .json({ title: "404 Not Found", message: "Url does not exist" });
      }

      const client = await pool.connect();

      try {
        await queries.startTransaction(client);

        let data = {};

        let response = {};

        if (text !== undefined && text.length > 0) {
          data["text"] = text;
          data["user_id"] = user_id;

          response = await queries.editPost(data, client);
        }

        if (req.imageUrl !== undefined) {
          const imageResponse = await queries.editImage(
            response.id,
            imageUrl,
            client
          );
          response["image"] = imageResponse["image"];
        }

        if (hashtags.length !== 0) {
          const existingHashtags = await queries.getAllHashtags(tag, client);

          // delete previous hashtags
          for (const tag of existingHashtags) {
            await queries.deletePostHashTag(post_id, tag["id"]);
          }

          for (const tag of existingHashtags) {
            await queries.deleteHashTag(tag["hashtag"], client);
          }

          // add new hashtags
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

          if (hashtags.length > 0) {
            response["hashtags"] = hashtags;
          }

          await queries.commitTransaction(client);

          return res
            .status(200)
            .json({ title: "Post Edited Successfully", data: response });
        }
      } catch (error) {}

      if (text !== undefined) {
      }
    }
  );
};

module.exports = editPost;
