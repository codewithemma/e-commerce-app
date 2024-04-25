import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to db....");
  } catch (error) {
    console.log("Error while connecting to the database..", error);
  }
}
