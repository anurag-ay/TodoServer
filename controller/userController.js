import _ from "lodash";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, {
  validateLoginUserRequest,
  validateRegisterUserRequest,
} from "../models/UserModel.js";

import Category from "../models/CategoryModel.js";

// Register User
export const registerUser = async (req, res) => {
  const { error } = validateRegisterUserRequest(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { userName, firstName, lastName, password } = req.body;

  let user = await User.findOne({ userName: userName });

  if (user)
    return res
      .status(400)
      .send({ error: "User with this username already exists" });

  user = new User({
    userName,
    firstName,
    lastName,
    password,
  });

  user.password = await bcrypt.hash(user.password, 12);

  let savedUser = await user.save();
  savedUser = _.pick(savedUser, ["_id", "userName", "firstName", "lastName"]);

  const defaultCategory = new Category({
    type: "All Tasks",
    user: savedUser._id,
  });
  defaultCategory.save();

  await User.updateOne(
    { _id: savedUser._id },
    {
      $set: { allTaskCategory: defaultCategory._id },
    }
  );

  res.status(201).send(savedUser);
};

// logIn User
export const logIn = async (req, res) => {
  const { error } = validateLoginUserRequest(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { userName, password } = req.body;

  let user = await User.findOne({ userName: userName });

  if (!user)
    return res.status(404).send("User with this User Name doesn't Exist");

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) return res.status(403).send("Incorrect Password");

  user = _.pick(user, [
    "_id",
    "userName",
    "firstName",
    "lastName",
    "categories",
    "allTaskCategory",
  ]);
  const token = jwt.sign(user, process.env.JWT_SECRET_KEY);

  res.status(200).send(token);
};

// Find User by Id
export const getUser = async (req, res) => {
  const { userId } = req.params;

  let user = await User.findById({ _id: userId });

  user = user.toObject();
  user = _.omit(user, "password");

  res.status(200).send(user);
};
