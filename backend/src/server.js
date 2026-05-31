const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const tasksRouter = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/devops-app";

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "backend" });
});

app.use("/api/tasks", tasksRouter);

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

start();
