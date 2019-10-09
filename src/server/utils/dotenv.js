import path from "path";
import dotenv from "dotenv";

dotenv.config();
dotenv.config({
  path: path.join(process.cwd(), ".env-secure")
});
