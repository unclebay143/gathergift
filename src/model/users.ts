import mongoose, { models, Schema } from "mongoose";

const ALLOWED_AUTH_PROVIDER = ["google", "credentials"];

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    photo: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
    },
    authProvider: {
      type: String,
      enum: ALLOWED_AUTH_PROVIDER,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || mongoose.model("User", UserSchema);

export { User };
