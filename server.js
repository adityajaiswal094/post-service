const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const uploadImage = require("./src/apis/uploadImage");
const addPost = require("./src/apis/addPost");

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// apis
addPost(app);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
