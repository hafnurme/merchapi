import Express from "express";
import db from "./config/Database.js";
import { Models } from "./models/Models.js";
import cors from "cors";
import router from "./routes/index.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


dotenv.config();
const app = Express();
const port = 2100;

try {
  await db.authenticate();
  console.log("Connected to database...");
  Models()
} catch (error) {
  console.error(error);
}
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(Express.static('assets'));
app
  .use(cookieParser())
  .use(Express.json())
  .use(Express.urlencoded({ extended: true }))
  .use(router)
  .listen(port, () => {
    console.log(`Server Running at port ${port}`);
  });
