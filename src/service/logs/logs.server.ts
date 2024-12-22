import connectViaMongoose from "@/lib/mongodb";
import { Log } from "@/model/logs";

export const getAllLogs = async () => {
  try {
    await connectViaMongoose();

    const logs = await Log.find();

    return JSON.parse(JSON.stringify(logs));
  } catch (error) {
    console.error("Error fetching logs: ", error);
    return null;
  }
};
