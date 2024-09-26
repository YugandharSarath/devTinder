const express = require("express");
require("./config/database");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  //Creating a new instance of User model
  const user = new User({
    firstName: "Prabhas",
    lastName: "Raju",
    emailId: "actor.prabhas@gmail.com",
    password: "Anushka@123",
  });

  try {
    await user.save();
    res.send("User Created Successfully");
  } catch (err) {
    res.status(400).send("Error creating user" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("Server is successfully listening on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed");
  });
