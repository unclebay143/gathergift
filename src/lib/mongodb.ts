import mongoose from "mongoose";

const connectViaMongoose = async () => {
  if (mongoose.connection.readyState === 1) {
    return; // Already connected
  }
  return mongoose.connect(process.env.MONGODB_URI!);
};

export default connectViaMongoose;
