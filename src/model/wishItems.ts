import { WISH_VISIBILITIES } from "@/const";
import mongoose, { models, Schema } from "mongoose";

const WishItemSchema: Schema = new Schema(
  {
    coverImage: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    externalLink: {
      type: String,
    },
    image_url: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    wishlist: {
      type: mongoose.Types.ObjectId,
      ref: "WishList",
      required: true,
    },
    visibility: {
      type: String,
      enum: WISH_VISIBILITIES,
      default: "PUBLIC",
    },
  },
  {
    timestamps: true,
  }
);

const WishItem = models.WishItem || mongoose.model("WishItem", WishItemSchema);

export { WishItem };
