const pool = require("../dbConfig");

const addPost = async (data) => {
    const {text, user_id, image, hashtags} = data;
    
    const query = `INSERT INTO posts (user_id, text, image, hashtags) VALUES($1, $2, $3, $4) RETURNING *`;

    const result = await pool.query(query, [user_id, text, image, hashtags]);

    return result.rows[0];
};

module.exports = { addPost };
