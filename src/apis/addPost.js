const queries = require("../db/queries/queries");
const checkUserLoggedIn = require("../middleware/checkUserLoggedIn");

const addPost = (app) => {
    try {
        app.post("/v1/post", checkUserLoggedIn, async (req, res) => {
            const {text, image, hashtags} = req.body;
            const user_id = req.header("user_id");

            let data = {};

            if(text === undefined) {
                return res.status(400).json({title: "Bad Request", message: "Text cannot be empty"});
            }
            data['text'] = text;
            data['user_id'] = user_id;

            if(image !== undefined) {
                data['image'] = image;
            }
            if(hashtags !== undefined) {
                data['hashtags'] = hashtags;
            }

            const response = await queries.addPost(data);

            return res.status(201).json({title: "Post Created Successfully", data: response});
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({title: "Internal Server Error", message: error.message.length != 0 ? error.message : "Something went wrong"});
    }
};

module.exports = addPost;