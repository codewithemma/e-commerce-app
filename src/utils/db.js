import { MongoClient } from "mongodb";

const localUrl = "mongodb://localhost:27017/exclusive_db";
const uri = process.env.MONGO_URI;
const url = process.env.NODE_ENV === "production" ? uri : localUrl;
const options = {};

if (!url) throw new Error("Please add your Mongo URI to .env.local");

let client = new MongoClient(url, options);
let clientPromise;

if (process.env.NODE_ENV !== "production") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;
