import mongoose from "mongoose"

const connectMongoose = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
    } catch (error) {
        console.error(error);
    }
};

export default connectMongoose;