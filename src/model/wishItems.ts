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
  },
  {
    timestamps: true,
  }
);

const WishItem = models.WishItem || mongoose.model("WishItem", WishItemSchema);

export { WishItem };
