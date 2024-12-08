import mongoose, { models, Schema } from "mongoose";

const ALLOWED_OCCASION = ['Christmas', 'Birthday', 'Graduation', 'Wedding'];
const ALLOWED_STATUS = ['open', 'completed', 'closed']

const ContributorSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        contributor_date: {
            type: Date,
            default: Date.now
        },
        note: {
            type: String
        }
    }
);

const ItemSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            // required: true
        },
        image_url: {
            type: String,
            required: true
        },
        target_amount: {
            type: String,
            required: true
        },
        contributed_amount: {
            type: String,
            required: true
        },
        contributors: [ContributorSchema],
        status: {
            type: String,
            enum: ALLOWED_STATUS,
            default: 'open'
        }
    }
);

const WishlistsSchema: Schema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        occasion: {
            type: String,
            enum: ALLOWED_OCCASION,
            required: true
        },
        items: [ItemSchema]
    }
);

const WishLists = models.Wishlists || mongoose.model('Wishlist', WishlistsSchema);

export { WishLists }