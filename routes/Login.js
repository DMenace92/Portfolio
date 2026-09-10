const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sdk = require("node-appwrite");
const client = require("../config/appwrite");
const auth = require("../middleware/Auth");
const { logger } = require("../utils/logger");

const Router = new express.Router();
const databases = new sdk.Databases(client);

const JWT_SECRET = process.env.JWT_SECRET || process.env.AUTH_TOKEN_NUM;

// Authenticate an admin against the Appwrite users collection.
Router.post("/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .send({ error: "Username and password are required" });
    }

    const databaseId = process.env.APPWRITE_DATABASE_ID;
    const collectionId = process.env.APPWRITE_USER_COLLECTION_ID;
    if (!databaseId || !collectionId) {
      logger.error(
        new Error("Database ID or Users Collection ID is not defined"),
      );
      return res.status(500).send({ error: "Auth is not configured" });
    }
    if (!JWT_SECRET) {
      logger.error(new Error("JWT secret is not defined"));
      return res.status(500).send({ error: "Auth is not configured" });
    }

    const { documents } = await databases.listDocuments(
      databaseId,
      collectionId,
      [sdk.Query.equal("username", username), sdk.Query.limit(1)],
    );

    const user = documents[0];
    if (!user) {
      return res.status(401).send({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { _id: user.$id, username: user.username },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.send({
      user: { id: user.$id, username: user.username },
      token,
    });
  } catch (e) {
    logger.error(e);
    res.status(500).send({ error: e.message });
  }
});

// With stateless JWTs, logout is handled client-side by discarding the token.
Router.post("/admin/logout", auth, (req, res) => {
  res.send({ message: "Logged out" });
});

module.exports = Router;
