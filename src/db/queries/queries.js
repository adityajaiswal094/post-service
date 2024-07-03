const pool = require("../dbConfig");

const startTransaction = async (client) => await client.query("BEGIN");

const commitTransaction = async (client) => await client.query("COMMIT");

const rollbackTransaction = async (client) => await client.query("ROLLBACK");

const addPost = async (data, client) => {
  const { text, user_id } = data;

  const query = "INSERT INTO posts (user_id, text) VALUES($1, $2) RETURNING *";

  const result = await client.query(query, [user_id, text]);

  return result.rows[0];
};

const editPost = async (data, client) => {
  const {text, user_id} = data;

  const query = "UPDATE posts SET text=$1 WHERE user_id=$2 RETURNING *";

  const result = await client.query(query, [text, user_id]);

  return result.rows[0];
};

const addImage = async (post_id, imageUrl, client) => {
  const query =
    "INSERT INTO images (post_id, image) VALUES ($1, $2) RETURNING *";

  const result = await client.query(query, [post_id, imageUrl]);

  return result.rows[0];
};

const editImage = async (post_id, imageUrl, client) => {
  const query = "UPDATE posts SET image=$1 WHERE post_id=$2 RETURNING *";

  const result = await client.query(query, [imageUrl, post_id]);

  return result.rows[0];
};

const getAllHashtags = async (tag, client) => {
  const query = "SELECT id FROM hashtags WHERE hashtag=$1";

  const result = await client.query(query, [tag]);

  return result.rows;
};

const addHashTag = async (tag, client) => {
  const query = "INSERT INTO Hashtags (hashtag) VALUES ($1) RETURNING id";

  const result = await client.query(query, [tag]);

  return result.rows;
};

const deleteHashTag = async (tag, client) => {
  const query = "DELETE FROM hashtags WHERE hashtag=$1";

  const result = await client.query(query, [tag]);
};

const addPostHashTag = async (post_id, hashtag_id, client) => {
  const query =
    "INSERT INTO posthashtags (post_id, hashtag_id) VALUES ($1, $2)";

  const result = await client.query(query, [post_id, hashtag_id]);
};

const deletePostHashTag = async(post_id, hashtag_id, client) => {
  const query = "DELETE FROM hashtags WHERE hashtag=$1 AND post_id-$2";

  const result = await client.query(query, [hashtag_id, post_id]);
};

module.exports = {
  startTransaction,
  commitTransaction,
  rollbackTransaction,
  addPost,
  editPost,
  addImage,
  editImage,
  getAllHashtags,
  addHashTag,
  deleteHashTag,
  addPostHashTag,
  deletePostHashTag
};
