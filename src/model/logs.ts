import mongoose, { models, Schema } from "mongoose";

const LogSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    details: {
      type: String,
    },
    key: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Logs = models.Log || mongoose.model("Log", LogSchema);

export { Logs };
