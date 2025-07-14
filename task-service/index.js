import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(express.json());

// mongoose
//   .connect("mongodb://localhost:27017/tasks")
//   .then(() => console.log("connected to mongodb"))
//   .catch((err) => console.error("mongodb connection error: ", err));
mongoose
  .connect("mongodb://mongo:27017/tasks")
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.error("mongodb connection error: ", err));

const TaskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    userId: String,
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);

app.post("/tasks", async (req, res) => {
  console.log(req.body);
  const { title, description, userId } = req.body || {};
  try {
    const task = new Task({ title, description, userId });
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    console.error("Error saving ", error);
    res.status(500).send({ error: " Internal Server Error" });
  }
});
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.status(200).send(tasks);
});
app.listen(port, () => {
  console.log(`Task service listening on http://localhost:${port}`);
});
