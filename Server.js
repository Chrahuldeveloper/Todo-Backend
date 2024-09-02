const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 9000;
const registerrouter = require("./routes/Register.js");
const Todorouter = require("./routes/Todo.js");

app.use(cors());
app.use(express.json());
app.use("/", registerrouter);
app.use("/", Todorouter);

const startServer = async () => {
  console.log(`Server Started at http://localhost:${PORT}`);
};

const dbconnection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017");
    console.log("DB connection established");
  } catch (error) {
    console.log(error);
  }
};

app.listen(PORT, async () => {
  await dbconnection();
  startServer();
});
