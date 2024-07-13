import mongoose from "mongoose";
const uri = process.env.MONGO_URI;
const localUrl = "mongodb://localhost:27017/exclusive-db";
const url = process.env.NODE_ENV === "production" ? uri : localUrl;
let isConnected = false;
export async function connectDB() {
  if (isConnected) {
    console.log("connected to db....");
    return;
  }
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Adjust the timeout as needed
    });
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Error while connecting to the database..", error);
  }
}
