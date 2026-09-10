const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || process.env.AUTH_TOKEN_NUM;

// Verify the stateless JWT issued at login and attach the decoded admin to the request.
const auth = (req, res, next) => {
  try {
    const header = req.header("Authorization") || "";
    const token = header.replace("Bearer ", "").trim();
    if (!token) {
      throw new Error("Missing token");
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.token = token;
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = auth;
