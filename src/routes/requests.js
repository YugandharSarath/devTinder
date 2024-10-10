const express = require("express");

const requestsRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModal = require("../models/connectionRequest");
const User = require("../models/user");

requestsRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Invalid Status Type" + status,
        });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({
          message: "User Not Found",
        });
      }
      //if there is an existing connection request

      const existingConnectionRequest = await ConnectionRequestModal.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
        fromUserId,
        toUserId,
      });

      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "Connection Request is Already Exists!" });
      }

      const connectionRequest = new ConnectionRequestModal({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message: req.user.firstName + "is" + status + "in" + toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  }
);

module.exports = requestsRouter;
