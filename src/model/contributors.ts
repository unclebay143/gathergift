import mongoose, { models, Schema } from "mongoose";

const ContributorItemSchema = new Schema({
  item: {
    type: mongoose.Types.ObjectId,
    ref: "Item",
  },
  amount: {
    type: Number,
    min: [0, "Amount must be at least 0"],
  },
});

const ContributorSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      maxLength: 500,
    },
    totalItemAmount: {
      type: Number,
      maxLength: 500,
    },
    wish: {
      type: mongoose.Types.ObjectId,
      ref: "Wish",
      required: true,
    },
    details: [ContributorItemSchema],
  },
  {
    timestamps: true,
  }
);

ContributorSchema.index({ wish: 1 });

const Contributor =
  models.Contributor || mongoose.model("Contributor", ContributorSchema);

export { Contributor };
