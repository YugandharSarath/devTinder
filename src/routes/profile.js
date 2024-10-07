const express = require("express");
const bcrypt = require("bcrypt");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
      // return res.status(400).send("")
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName} your Profile updated Successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const loggedInUser = req.user;

    const isMatch = await bcrypt.compare(
      currentPassword,
      loggedInUser.password
    );
    if (!isMatch) {
      return res.status(400).send("Current password is incorrect.");
    }

    loggedInUser.password = await bcrypt.hash(newPassword, 10);
    await loggedInUser.save();

    res.json({ message: "Password updated successfully." });
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});
module.exports = profileRouter;
