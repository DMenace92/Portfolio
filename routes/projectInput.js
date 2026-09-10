const express = require("express");
const Router = new express.Router();
const multer = require("multer");
const { Databases, Storage, ID, Permission, Role } = require("node-appwrite");
const { InputFile } = require("node-appwrite/file");
const client = require("../config/appwrite");
const auth = require("../middleware/Auth");

const databases = new Databases(client);
const storage = new Storage(client);
const DB_ID = process.env.APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.APPWRITE_PROJECT_COLLECTION_ID;
const BUCKET_ID = process.env.APPWRITE_BUCKET_ID;
const ENDPOINT = (
  process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1"
)
  .trim()
  .replace(/^["']|["']$/g, "");
const PROJECT_ID = process.env.APPWRITE_PROJECT_ID;

// Public view URL for a file stored in the Appwrite bucket.
const fileViewUrl = (fileId) =>
  `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${PROJECT_ID}`;

// Appwrite stores object arrays as JSON strings; parse them back for the client.
const safeParse = (val) => {
  if (Array.isArray(val)) return val;
  if (!val) return [];
  try {
    return JSON.parse(val);
  } catch {
    return [];
  }
};

const toArray = (val) => {
  if (Array.isArray(val)) return val;
  if (val === undefined || val === null || val === "") return [];
  return String(val)
    .split(",")
    .map((v) => v.trim());
};

// Map an Appwrite document back to the shape the frontend expects.
const toClientProject = (doc) => ({
  _id: doc.$id,
  title: doc.title,
  techUsed: doc.techUsed || [],
  features: doc.features || [],
  links: safeParse(doc.links),
  image: safeParse(doc.image),
  video: safeParse(doc.video),
  description: doc.description,
  createdAt: doc.createdAt || doc.$createdAt,
});

// Build the Appwrite document payload from an incoming request body.
const toDocumentData = (body) => {
  const data = {};
  if (body.title !== undefined) data.title = body.title;
  if (body.description !== undefined) data.description = body.description;
  if (body.techUsed !== undefined) data.techUsed = toArray(body.techUsed);
  if (body.features !== undefined) data.features = toArray(body.features);
  if (body.links !== undefined) data.links = JSON.stringify(body.links || []);
  if (body.images !== undefined) data.image = JSON.stringify(body.images || []);
  if (body.videos !== undefined) data.video = JSON.stringify(body.videos || []);
  if (body.createdAt !== undefined) data.createdAt = body.createdAt;
  return data;
};

const upload = multer({ storage: multer.memoryStorage() });

Router.post("/create_image", auth, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ error: "No file uploaded" });
    }
    if (!BUCKET_ID) {
      return res.status(500).send({ error: "APPWRITE_BUCKET_ID is not set" });
    }

    const file = await storage.createFile(
      BUCKET_ID,
      ID.unique(),
      InputFile.fromBuffer(req.file.buffer, req.file.originalname),
      [Permission.read(Role.any())],
    );

    res.status(200).json({ fileId: file.$id, url: fileViewUrl(file.$id) });
  } catch (e) {
    console.error(e);
    res.status(400).send({ error: e.message });
  }
});

Router.post("/create_project", auth, async (req, res) => {
  try {
    const data = toDocumentData(req.body);
    if (data.createdAt === undefined) data.createdAt = new Date().toISOString();

    const doc = await databases.createDocument(
      DB_ID,
      COLLECTION_ID,
      ID.unique(),
      data,
    );
    res.status(200).send({ project: toClientProject(doc) });
  } catch (e) {
    console.error(e);
    res.status(400).send({ error: e.message });
  }
});

Router.get("/get_projects", async (req, res) => {
  try {
    const { documents } = await databases.listDocuments(DB_ID, COLLECTION_ID);
    res.status(200).send(documents.map(toClientProject));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

Router.get("/get_project/:_id", async (req, res) => {
  try {
    const doc = await databases.getDocument(
      DB_ID,
      COLLECTION_ID,
      req.params._id,
    );
    res.status(200).send(toClientProject(doc));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

Router.patch("/update_project/:_id", auth, async (req, res) => {
  try {
    const doc = await databases.updateDocument(
      DB_ID,
      COLLECTION_ID,
      req.params._id,
      toDocumentData(req.body),
    );
    res.status(200).send(toClientProject(doc));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

Router.delete("/delete_project/:_id", auth, async (req, res) => {
  try {
    await databases.deleteDocument(DB_ID, COLLECTION_ID, req.params._id);
    res.status(200).send({ _id: req.params._id });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

module.exports = Router;
