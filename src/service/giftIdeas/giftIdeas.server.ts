import connectMongoose from "@/lib/mongodb"
import { GiftIdeas } from "@/model/gitfIdeas";

export const getAllGiftIdea = async () => {
    try {
        await connectMongoose();
        const giftIdea = await GiftIdeas.find();
        return JSON.parse(JSON.stringify(giftIdea));
    } catch (error) {
        console.error("Error fetching gifts: ", error);
        return null;
    }
}