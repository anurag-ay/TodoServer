import mongoose from "mongoose";
import Joi from "joi";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    lowercase: true,
    minlength: 3,
    maxlength: 255,
  },
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255,
  },

  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  ],
  allTaskCategory: {
    type: mongoose.Schema.ObjectId,
  },
});
const User = mongoose.model("Users", userSchema);
export default User;

// Request Validation Functions for User Route

export const validateRegisterUserRequest = (data) => {
  const schema = Joi.object({
    userName: Joi.string().min(3).max(255).required().messages({
      "string.empty": "Username cannot be empty",
      "string.min": "Username should have a minimum length of {#limit}",
      "string.max": "Username should have a maximum length of {#limit}",
    }),
    firstName: Joi.string().min(3).max(255).required().messages({
      "string.empty": "First name cannot be empty",
      "string.min": "First name should have a minimum length of {#limit}",
      "string.max": "First name should have a maximum length of {#limit}",
    }),
    lastName: Joi.string().min(3).max(255).required().messages({
      "string.empty": "Last name cannot be empty",
      "string.min": "Last name should have a minimum length of {#limit}",
      "string.max": "Last name should have a maximum length of {#limit}",
    }),

    password: Joi.string()
      .min(8)
      .max(30)
      .required()
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
      .messages({
        "string.empty": "Password cannot be empty",
        "string.min": "Password should have a minimum length of {#limit}",
        "string.max": "Password should have a maximum length of {#limit}",
        "string.pattern.base":
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
      }),
  });

  return schema.validate(data);
};

export const validateLoginUserRequest = (data) => {
  const schema = Joi.object({
    userName: Joi.string().min(3).max(255).required().messages({
      "string.empty": "Username cannot be empty",
      "string.min": "Username should have a minimum length of {#limit}",
      "string.max": "Username should have a maximum length of {#limit}",
    }),
    password: Joi.string().required().messages({
      "string.empty": "Password cannot be empty",
    }),
  });

  return schema.validate(data);
};
