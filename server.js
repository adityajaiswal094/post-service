const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const addPost = require("./src/apis/addPost");
const editPost = require("./src/apis/editPost");

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// apis
addPost(app);
editPost(app);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
