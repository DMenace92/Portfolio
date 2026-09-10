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
const COLLECTION_ID = process.env.APPWRITE_WORK_HISTORY_COLLECTION_ID;
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

const toNumber = (val, fallback = 0) => {
  const n = Number(val);
  return Number.isFinite(n) ? n : fallback;
};

// Map an Appwrite document back to the shape the frontend expects.
const toClientEntry = (doc) => ({
  _id: doc.$id,
  company: doc.company || "",
  jobTitle: doc.jobTitle || "",
  startDate: doc.startDate || "",
  endDate: doc.endDate || "",
  summary: doc.summary || "",
  logo: doc.logo || "",
  order: doc.order ?? 0,
  createdAt: doc.createdAt || doc.$createdAt,
});

// Build the Appwrite document payload from an incoming request body.
const toDocumentData = (body) => {
  const data = {};
  if (body.company !== undefined) data.company = body.company;
  if (body.jobTitle !== undefined) data.jobTitle = body.jobTitle;
  if (body.startDate !== undefined) data.startDate = body.startDate;
  if (body.endDate !== undefined) data.endDate = body.endDate;
  if (body.summary !== undefined) data.summary = body.summary;
  if (body.logo !== undefined) data.logo = body.logo;
  if (body.order !== undefined) data.order = toNumber(body.order);
  return data;
};

const guardCollection = (res) => {
  if (!DB_ID || !COLLECTION_ID) {
    res.status(500).send({
      error:
        "APPWRITE_DATABASE_ID or APPWRITE_WORK_HISTORY_COLLECTION_ID is not set",
    });
    return false;
  }
  return true;
};

const upload = multer({ storage: multer.memoryStorage() });

// Upload a company logo to Appwrite Storage and return its public URL.
Router.post(
  "/create_work_logo",
  auth,
  upload.single("file"),
  async (req, res) => {
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
  },
);

Router.get("/get_work_history", async (req, res) => {
  try {
    if (!guardCollection(res)) return;
    const { documents } = await databases.listDocuments(DB_ID, COLLECTION_ID);
    const entries = documents
      .map(toClientEntry)
      .sort((a, b) => a.order - b.order);
    res.status(200).send(entries);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

Router.get("/get_work_history/:_id", async (req, res) => {
  try {
    if (!guardCollection(res)) return;
    const doc = await databases.getDocument(
      DB_ID,
      COLLECTION_ID,
      req.params._id,
    );
    res.status(200).send(toClientEntry(doc));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

Router.post("/create_work_history", auth, async (req, res) => {
  try {
    if (!guardCollection(res)) return;
    const doc = await databases.createDocument(
      DB_ID,
      COLLECTION_ID,
      ID.unique(),
      toDocumentData(req.body),
    );
    res.status(200).send({ entry: toClientEntry(doc) });
  } catch (e) {
    console.error(e);
    res.status(400).send({ error: e.message });
  }
});

Router.patch("/update_work_history/:_id", auth, async (req, res) => {
  try {
    if (!guardCollection(res)) return;
    const doc = await databases.updateDocument(
      DB_ID,
      COLLECTION_ID,
      req.params._id,
      toDocumentData(req.body),
    );
    res.status(200).send(toClientEntry(doc));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

Router.delete("/delete_work_history/:_id", auth, async (req, res) => {
  try {
    if (!guardCollection(res)) return;
    await databases.deleteDocument(DB_ID, COLLECTION_ID, req.params._id);
    res.status(200).send({ _id: req.params._id });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

module.exports = Router;
