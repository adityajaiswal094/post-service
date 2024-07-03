const parseFormData = (req, res, next) => {
  if (req.body.data) {
    try {
      const data = JSON.parse(req.body.data);
      req.body = { ...req.body, ...data };
    } catch (err) {
      return res
        .status(400)
        .json({ title: "Bad Request", message: "Invalid JSON data" });
    }
  }
  next();
};

module.exports = parseFormData;