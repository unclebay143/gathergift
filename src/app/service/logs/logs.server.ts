import connectMongoose from "@/lib/mongodb";
import { Logs } from "@/model/logs";

export const getAllLogs = async () => {
    try {
        await connectMongoose();

        const logs = await Logs.find();
        
        return JSON.parse(JSON.stringify(logs));
    } catch (error) {
        console.error("Error fetching logs: ", error);
        return null;
    }
}