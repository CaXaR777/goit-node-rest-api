// const express = require('express');
// const cors = require('cors');
// const app = express();
require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

// mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.DB_HOST)
  .then(() => console.log("Database connection successful"))
  .then(() =>
    app.listen(3000, () => {
      console.log("Server is running. Use our API on port: 3000");
    })
  )
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

//   console.log(process.env)
