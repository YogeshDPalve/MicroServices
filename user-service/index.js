import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(express.json());

// mongoose
//   .connect("mongodb://localhost:27017/users")
//   .then(() => console.log("connected to mongodb"))
//   .catch((err) => console.error("mongodb connection error: ", err));
mongoose
  .connect("mongodb://mongo:27017/users")
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.error("mongodb connection error: ", err));

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", UserSchema);

app.post("/users", async (req, res) => {
  console.log(req.body);
  const { name, email } = req.body || {};
  try {
    const user = new User({ name, email });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    console.error("Error saving ", error);
    res.status(500).send({ error: " Internal Server Error" });
  }
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
});

app.listen(port, () => {
  console.log(`User service listening on http://localhost:${port}`);
});
