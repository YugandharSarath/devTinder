const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://YugandharSarath:Yugandhar%4053@cluster0.oubf8.mongodb.net/devTinder"
  );
};

module.exports = connectDB;