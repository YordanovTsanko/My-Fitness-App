import mongoose from "mongoose";

export const connectDatabase = async () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch((err) => {
      console.error("Failed to connect to mongoDB");
      console.error(err);
    });
};
