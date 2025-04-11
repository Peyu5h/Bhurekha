/**
 * Script to check if Mapbox API key is properly configured
 * Run with: node src/scripts/check-mapbox.js
 */

const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

// Load environment from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

console.log("=== Mapbox Configuration Check ===");

// Check if the environment variable exists
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
if (!MAPBOX_TOKEN) {
  console.log(
    "❌ NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN is not set in your environment",
  );
  console.log(
    "To fix this, create a .env.local file in your project root with:",
  );
  console.log("NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_token_here");
  console.log("\nYou can get a token from: https://account.mapbox.com/");
} else {
  console.log("✅ NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN is set");

  // Basic validation of token format
  if (MAPBOX_TOKEN.startsWith("pk.") && MAPBOX_TOKEN.length > 50) {
    console.log("✅ Token appears to be in the correct format");
  } else {
    console.log("❌ Token does not appear to be in the correct format");
    console.log(
      'Mapbox tokens typically start with "pk." and are long strings',
    );
  }

  // Check if we can make a simple request to the Mapbox API
  console.log("\nTesting API access...");

  const https = require("https");
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/Washington.json?access_token=${MAPBOX_TOKEN}`;

  https
    .get(url, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const parsedData = JSON.parse(data);
          if (parsedData.features && parsedData.features.length > 0) {
            console.log("✅ Successfully connected to Mapbox API");
          } else if (parsedData.message) {
            console.log(`❌ API returned an error: ${parsedData.message}`);
          } else {
            console.log("❌ API returned an unexpected response");
          }
        } catch (e) {
          console.log("❌ Failed to parse API response");
          console.log(e.message);
        }
      });
    })
    .on("error", (err) => {
      console.log(`❌ Failed to connect to Mapbox API: ${err.message}`);
    });
}

// Check if mapbox-gl is installed
try {
  const packageJson = require(path.resolve(process.cwd(), "package.json"));
  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  if (dependencies["mapbox-gl"]) {
    console.log(`✅ mapbox-gl is installed (${dependencies["mapbox-gl"]})`);
  } else {
    console.log("❌ mapbox-gl is not installed in package.json");
    console.log("Run: npm install mapbox-gl");
  }
} catch (e) {
  console.log("❌ Failed to check package.json");
}
