const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

//establish the express server
const app = express();
const port = process.env.PORT || 4000;

//create the middlewares
app.use(cors());
app.use(express.json());

//connecting with the MongoDB database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connections established successfully");
});

// require the file and then use the files
const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);
// for listening to the port
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
