import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

console.log(process.env.OPENAI_API_KEY)
import voiceRoutes from "./routes/voiceRoutes.js"


const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running!");
});

app.use("/api/voice",voiceRoutes);

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error(err));

app.listen(5000, () => console.log("Server started on 5000"));
