import mongoose from "mongoose";

export async function connect() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB connected!!"); // log immediately
    return conn;
  } catch (error) {
    console.error("DB connection error:", error);
    throw error;
  }
}
export default connect;
