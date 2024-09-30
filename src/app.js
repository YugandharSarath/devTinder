const express = require("express");
require("./config/database");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

//Find the User
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });

    if (!user) {
      res.status(404).send("User Not Found");
    } else {
      res.send(user);
    }

    // const users = await User.find({ emailId: userEmail });

    // if (users.length === 0) {
    //   res.status(404).send("User Not Found");
    // } else {
    //   res.send(users);
    // }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//Get All Users
app.get("/getAllUsers", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//Delete by userId
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User Deleted Successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//Update user
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
   const data = req.body;
   try {
    const user = await User.findByIdAndUpdate({_id: userId}, data);
    res.send("User Updated Successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
})

app.post("/signup", async (req, res) => {
  //Creating a new instance of User model
  const user = new User(req.body);

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
