const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const Joi = require("joi");

const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegExp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: "",
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().pattern(emailRegExp).required(),
});

const userEmailSchema = Joi.object({
   email: Joi.string().email().pattern(emailRegExp).required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().pattern(emailRegExp).required(),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const schemas = {
  registerSchema,
  userEmailSchema,
  loginSchema,
  updateSubscriptionSchema,
};

module.exports = {
  User,
  schemas,
};
