import mongoose, { models, Schema } from "mongoose";

const GiftIdeaSchema: Schema = new Schema(
    {
        category: {
            type: String,
            required: true
        },
        item_name: {
            type: String,
            required: true
        },
        item_description: {
            type: String,
            required: true,
        },
        item_image: {
            type: String,
            required: true
        },
        price_range: {
            type: String,
            required: true
        }
    }, {
        timestamps: true
    }
);

const GiftIdeas = models.giftIdeas || mongoose.model("GiftIdeas", GiftIdeaSchema)

export { GiftIdeas }