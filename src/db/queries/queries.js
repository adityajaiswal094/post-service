const pool = require("../dbConfig");

const startTransaction = async (client) => await client.query("BEGIN");

const commitTransaction = async (client) => await client.query("COMMIT");

const rollbackTransaction = async (client) => await client.query("ROLLBACK");

const addPost = async (data, client) => {
  const { text, user_id } = data;

  const query = `INSERT INTO posts (user_id, text) VALUES($1, $2) RETURNING *`;

  const result = await client.query(query, [user_id, text]);

  return result.rows[0];
};

const addImage = async (post_id, imageUrl, client) => {
  const query =
    "INSERT INTO images (post_id, image) VALUES ($1, $2) RETURNING *";

  const result = await client.query(query, [post_id, imageUrl]);

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

const addPostHashTag = async (post_id, hashtag_id, client) => {
  const query =
    "INSERT INTO posthashtags (post_id, hashtag_id) VALUES ($1, $2)";

  const result = await client.query(query, [post_id, hashtag_id]);
};

module.exports = {
  startTransaction,
  commitTransaction,
  rollbackTransaction,
  addPost,
  addImage,
  getAllHashtags,
  addHashTag,
  addPostHashTag,
};
