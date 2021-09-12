const genres = require("./routes/genres");
const home = require("./routes/home");
const express = require("express");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/vidlyBackend")
  .then(() => console.log("Connected to the vidlyBackend Mongo DB..."))
  .catch((err) =>
    console.error("Could not connect to vidlyBackend Mongo DB...", err)
  );

//Express setup
const app = express();
app.use(express.json());

//Routing section
app.use("/", home);
app.use("/api/genres", genres);

//Define the port where the application is going to listen
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
