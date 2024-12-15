import {
  WISH_CATEGORIES,
  WISH_STATUS,
  WISH_VISIBILITIES,
  CURRENCIES,
} from "@/const";
import mongoose, { models, Schema } from "mongoose";

const WishSchema: Schema = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    coverImage: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    thankYouMessage: {
      type: String,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    currency: {
      type: String,
      enum: CURRENCIES,
      required: true,
    },
    target_amount: {
      type: Number,
      required: true,
    },
    contributed_amount: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: WISH_CATEGORIES,
      required: true,
    },
    visibility: {
      type: String,
      enum: WISH_VISIBILITIES,
      required: true,
    },
    status: {
      type: String,
      enum: WISH_STATUS,
      required: true,
    },
    itemsEnabled: { type: Boolean, required: true },
    endDate: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Wish = models.Wish || mongoose.model("Wish", WishSchema);

export { Wish };
