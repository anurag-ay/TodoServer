import mongoose from "mongoose";

export default function databaseConfig() {
  let DATABASE_URL = process.env.DATABASE_URL_DEV;

  if (process.env.NODE_ENV === "production") {
    DATABASE_URL = process.env.DATABASE_URL_PROD;
  }

  mongoose
    .connect(DATABASE_URL)
    .then(() => console.log("Connected to the MongoDB..."))
    .catch((err) => console.log(err));
}
