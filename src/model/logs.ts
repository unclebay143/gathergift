import mongoose, { models, Schema } from "mongoose";

const ALLOWED_AUDIT_TYPE = ["onboarding", "system"];

const LogSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    type: { type: String, enum: ALLOWED_AUDIT_TYPE, default: "system" },
  },
  {
    timestamps: true,
  }
);

const Log = models.Log || mongoose.model("Log", LogSchema);

export { Log };
