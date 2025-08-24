const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://YugandharSarath:gafE4P7tCkaz7nay@cluster0.oubf8.mongodb.net/devTinder"
  );
};

module.exports = connectDB;