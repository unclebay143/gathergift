import mongoose, { Document, models, Schema } from "mongoose";

interface ILog extends Document { 
    user_id: mongoose.Schema.Types.ObjectId; 
    key: string; 
    action: string; 
    details: string; 
}
const LogSchema: Schema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
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

const Logs = models.Log || mongoose.model<ILog>("Log", LogSchema)

export { Logs };