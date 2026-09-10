require("dotenv").config();
const bcrypt = require("bcryptjs");
const sdk = require("node-appwrite");
const client = require("../config/appwrite");

// Creates an admin user in the Appwrite users collection with a bcrypt-hashed password.
// Usage: node scripts/seedAdmin.js <username> <password> [email]
(async () => {
  const [, , username, password, email] = process.argv;

  if (!username || !password) {
    console.error(
      "Usage: node scripts/seedAdmin.js <username> <password> [email]",
    );
    process.exit(1);
  }

  const databaseId = process.env.APPWRITE_DATABASE_ID;
  const collectionId = process.env.APPWRITE_USER_COLLECTION_ID;

  if (!databaseId || !collectionId) {
    console.error(
      "APPWRITE_DATABASE_ID and APPWRITE_USER_COLLECTION_ID must be set in .env",
    );
    process.exit(1);
  }

  const databases = new sdk.Databases(client);
  const hashedPassword = await bcrypt.hash(password, 8);

  const doc = await databases.createDocument(
    databaseId,
    collectionId,
    sdk.ID.unique(),
    {
      username,
      password: hashedPassword,
      email: email || "",
      privilage: "gold",
    },
  );

  console.log(`Admin user "${username}" created with id: ${doc.$id}`);
  process.exit(0);
})().catch((e) => {
  console.error("Failed to create admin user:", e.message);
  process.exit(1);
});
