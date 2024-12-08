import mongoose, { models, Schema } from "mongoose";

const UserSchema: Schema = new Schema(
    {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        profile_picture: {
            type: String,
        },
    }, {
        timestamps: true
    }
);

const User = models.User || mongoose.model("User", UserSchema);

export { User };