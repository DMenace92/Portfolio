const sdk = require("node-appwrite");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Init SDK
const client = new sdk.Client();
const endpoint = (
  process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1"
)
  .trim()
  .replace(/^["']|["']$/g, "");

try {
  client
    .setEndpoint(endpoint) // Your API Endpoint
    .setProject(process.env.APPWRITE_PROJECT_ID) // Your project ID
    .setKey(process.env.APPWRITE_API_KEY); // Your secret API key

  // Validate connection
  console.log("Appwrite client initialized successfully");
} catch (error) {
  console.error("Failed to initialize Appwrite client:", error.message);
  process.exit(1);
}

module.exports = client;
