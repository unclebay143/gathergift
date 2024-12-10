import mongoose, { models, Schema } from "mongoose";

const ALLOWED_AUTH_PROVIDER = ["google", "credentials"];

const UserSchema: Schema = new Schema(
    {
        first_name: {
            type: String,
            // required: true
        },
        last_name: {
            type: String,
            // required: true
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
        authProvider: {
            type: String,
            enum: ALLOWED_AUTH_PROVIDER,
            required: true,
        },
    }, {
        timestamps: true
    }
);

const User = models.User || mongoose.model("User", UserSchema);

export { User };