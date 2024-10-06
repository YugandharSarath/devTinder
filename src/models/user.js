const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minLength: [2, "First name must be at least 2 characters long"],
      maxLength: [25, "First name cannot exceed 25 characters"],
    },
    lastName: {
      type: String,
      trim: true,
      maxLength: [25, "Last name cannot exceed 25 characters"],
    },
    emailId: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      unique: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least 8 characters long"],
      validate: {
        validator: function (v) {
          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(v);
        },
        message:
          "Password must contain at least one number, one uppercase and lowercase letter, and one special character",
      },
    },
    age: {
      type: Number,
      min: [18, "User must be at least 18 years old"],
      max: [120, "Age cannot exceed 120 years"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      lowercase: true,
      enum: {
        values: ["male", "female", "other"],
        message: "{VALUE} is not a valid gender",
      },
    },
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
      validate: [validator.isURL, "Please provide a valid URL for the photo"],
    },
    about: {
      type: String,
      default: "This is default about of the user!",
      maxLength: [500, "About section cannot exceed 500 characters"],
    },
    skills: {
      type: [String],
      validate: {
        validator: function (v) {
          return v.length <= 10;
        },
        message: "Cannot have more than 10 skills",
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (this.firstName) this.firstName = this.firstName.trim();
  if (this.lastName) this.lastName = this.lastName.trim();
  next();
});

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = bcrypt.compare(passwordInputByUser, passwordHash);

  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
