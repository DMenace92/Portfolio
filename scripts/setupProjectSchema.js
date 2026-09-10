require("dotenv").config();
const sdk = require("node-appwrite");
const client = require("../config/appwrite");

// Ensures the project collection has all attributes written by routes/projectInput.js.
// Safe to re-run: attributes that already exist are skipped.
// Usage: node scripts/setupProjectSchema.js
const databases = new sdk.Databases(client);

const databaseId = process.env.APPWRITE_DATABASE_ID;
const collectionId = process.env.APPWRITE_PROJECT_COLLECTION_ID;

// key, size, required, array
const stringAttributes = [
  ["title", 255, false, false],
  ["description", 5000, false, false],
  ["techUsed", 255, false, true],
  ["features", 1000, false, true],
  ["links", 10000, false, false],
  ["image", 10000, false, false],
  ["video", 10000, false, false],
  ["createdAt", 255, false, false],
];

const isAlreadyExists = (e) =>
  e?.code === 409 || /already exists/i.test(e?.message || "");

(async () => {
  if (!databaseId || !collectionId) {
    console.error(
      "APPWRITE_DATABASE_ID and APPWRITE_PROJECT_COLLECTION_ID must be set in .env",
    );
    process.exit(1);
  }

  for (const [key, size, required, array] of stringAttributes) {
    try {
      await databases.createStringAttribute(
        databaseId,
        collectionId,
        key,
        size,
        required,
        undefined,
        array,
      );
      console.log(`Created attribute: ${key}${array ? " (array)" : ""}`);
    } catch (e) {
      if (isAlreadyExists(e)) {
        console.log(`Skipped (exists): ${key}`);
      } else {
        console.error(`Failed to create "${key}":`, e.message);
        process.exit(1);
      }
    }
  }

  console.log("Project schema is ready.");
  process.exit(0);
})().catch((e) => {
  console.error("Failed to set up project schema:", e.message);
  process.exit(1);
});
