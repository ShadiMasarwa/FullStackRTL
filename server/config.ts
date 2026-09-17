import dotenv from "dotenv";

// Local .env values take precedence when present. In hosted environments,
// platform-provided variables remain available as a fallback.
dotenv.config({ override: true });