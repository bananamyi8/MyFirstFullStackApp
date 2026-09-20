const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Task routes
app.use("/api/tasks", require("./routes/taskRoutes"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.get("/", (req, res) => {
  res.send("TaskMate Backend is Running!");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`TaskMate server running on port ${PORT}`);
});