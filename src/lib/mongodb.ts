import mongoose from "mongoose";

const connectViaMongoose = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
  } catch (error) {
    console.error(error);
  }
};

export default connectViaMongoose;
