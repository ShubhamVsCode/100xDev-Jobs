import mongoose from "mongoose";

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI as string;
  if (!MONGO_URI) {
    throw new Error("Please set MONGO_URI in your .env file");
  }

  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: While connecting to MongoDB`);
    process.exit(1);
  }
};

export default connectDB;
