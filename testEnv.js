import dotenv from "dotenv";
import path from "path";

const envPath = path.resolve("./server/config.env");
console.log("Looking for config.env at:", envPath);

const result = dotenv.config({ path: envPath });
console.log("Dotenv result:", result);
console.log("ATLAS_URI:", process.env.ATLAS_URI);
