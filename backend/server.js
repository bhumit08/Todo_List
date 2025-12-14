const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://mongo:27017/My_db")
  .then(() => console.log("MongoDB connected: My_db"))
  .catch((err) => console.error(err));

const TodoSchema = new mongoose.Schema({text: String,completed: Boolean},
  { collection: "to_do" }
);

const Todo = mongoose.model("Todo", TodoSchema);
app.post("/todos", async (req, res) => {
  const todo = new Todo({ text: req.body.text, completed: false });
  const saved = await todo.save();
  res.json(saved);
});

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.put("/todos/:id", async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(
    req.params.id,
    { text: req.body.text, completed: req.body.completed },
    { new: true }
  );
  res.json(updated);
});

app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

app.listen(8081, () => {
  console.log("Backend running on port 8081");
});