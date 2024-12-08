import mongoose, { models, Schema } from "mongoose";


const LogSchema: Schema = new Schema(
    {
        user_id: {
            type: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        },
        action: {
            type: String,
            required: true
        },
        details: {
            type: String,
            required: true
        },
        key: {
            type: String,
            required: true
        }
    }, {
        timestamps: true
    }
);

const Log = models.Log || mongoose.model("Log", LogSchema)

export { Log };