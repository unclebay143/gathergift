import connectMongoose from "@/lib/mongodb";
import { User } from "@/model/users";
import { User as UserType } from "@/types";
import { getServerSessionWithAuthOptions } from "@/utils/nextAuth.config";

export const getCurrentUser = async () => {
  try {
    await connectMongoose();
    const session = await getServerSessionWithAuthOptions();
    if (!session) {
      return null;
    }

    const user = await User.findOne({
      email: session.user?.email,
    }).select("username photo");

    if (!user) {
      return null;
    }

    return JSON.parse(JSON.stringify(user)) as UserType;
  } catch (error) {
    console.log(error);
    return null;
  }
};
