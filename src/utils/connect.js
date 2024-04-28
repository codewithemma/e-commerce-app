import mongoose from "mongoose";
const url = process.env.MONGO_URI;
let isConnected = false;
const localUrl = "mongodb://localhost:27017/exclusive_db";
export async function connectDB() {
  if (isConnected) {
    console.log("connected to db....");
    return;
  }
  try {
    await mongoose.connect(localUrl);
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Error while connecting to the database..", error);
  }
}
