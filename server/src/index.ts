import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const PORT =  process.env.PORT;

import voiceRoutes from "./routes/voiceRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running!");
});

app.use("/api/voice",voiceRoutes);
app.use("/api/task" , taskRoutes);

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.error(err));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
