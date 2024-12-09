import mongoose, { Document, models, Schema } from "mongoose";

const ALLOWED_OCCASION = ['Christmas', 'Birthday', 'Graduation', 'Wedding'];
const ALLOWED_STATUS = ['open', 'completed', 'closed']

interface IWishlist extends Document { 
    user_id: mongoose.Schema.Types.ObjectId; 
    name: string; occasion: string; 
    items: { 
        title: string; 
        description?: string; 
        image_url?: string; 
        target_amount: number; 
        contributed_amount?: number; 
        contributors?: { 
            name: string; 
            amount: number; 
            contribution_date?: Date; 
            note?: string; 
        }[]; 
        status: 'open' | 'completed' | 'closed'; 
    }[]; 
}

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
            // required: true
        },
        target_amount: {
            type: Number,
            required: true
        },
        contributed_amount: {
            type: Number,
            default: 0
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
            type: mongoose.Schema.Types.ObjectId,
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
    }, {
        timestamps: true,
    }
);

const WishLists = models.Wishlists || mongoose.model<IWishlist>('Wishlist', WishlistsSchema);

export { WishLists }