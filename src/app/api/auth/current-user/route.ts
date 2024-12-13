import {  NextResponse } from "next/server";
import { getServerSessionWithAuthOptions } from "@/utils/nextAuth.config";
import { User } from "@/model/users";
import connectMongoose from "@/lib/mongodb";

const GET = async () => {
  try {
    await connectMongoose();

    const session = await getServerSessionWithAuthOptions();

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email: session.user.email }).select(
      "first_name last_name email profile_picture"
    );

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching current user: ", error);
    return NextResponse.json(
      { message: "Failed to fetch current user", error},
      { status: 500 }
    );
  }
};

export { GET };
