const { default: axios } = require("axios");

const checkUserLoggedIn = async (req, res, next) => {
  const user_id = req.header("user_id");

  if (user_id === undefined) {
    return res
      .status(400)
      .json({ title: "Bad Request", message: "Header user_id missing" });
  }

  try {
    const response = await axios.get("http://localhost:3000/userloggedin", {
      params: { user_id: user_id },
    });

    if (response.data.isLoggedIn) {
      next();
    } else {
      return res.status(401).json({
        title: "Unauthorized",
        message: "You need to sign in to use this feature",
      });
    }
  } catch (error) {
    console.error("Error checking user login status:", error);
    res.status(500).send({
      title: "Internal Server Error",
      message:
        error.message.length != 0 ? error.message : "Something went wrong",
    });
  }
};

module.exports = checkUserLoggedIn;
