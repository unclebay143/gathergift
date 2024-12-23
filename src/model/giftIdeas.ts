import mongoose, { models, Schema } from "mongoose";

const GiftIdeaSchema: Schema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price_range: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const GiftIdeas =
  models.giftIdeas || mongoose.model("GiftIdeas", GiftIdeaSchema);

export { GiftIdeas };
