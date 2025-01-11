import {
  WISH_CATEGORIES,
  WISH_STATUS,
  WISH_VISIBILITIES,
  CURRENCIES,
} from "@/const";
import mongoose, { models, Schema } from "mongoose";

const WishListSchema: Schema = new Schema(
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
    flutterwave_account_reference: { type: String, required: true },
    flutterwave_barter_id: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const WishList = models.WishList || mongoose.model("WishList", WishListSchema);

export { WishList };
