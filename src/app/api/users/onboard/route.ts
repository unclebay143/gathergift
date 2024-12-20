import connectViaMongoose from "@/lib/mongodb";
import { User } from "@/model/users";
import { getServerSessionWithAuthOptions } from "@/utils/nextAuth.config";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { username } = body;

    if (!username) {
      return NextResponse.json(
        { message: "Username cannot be empty." },
        { status: 404 }
      );
    }

    const session = await getServerSessionWithAuthOptions();
    if (!session) {
      return NextResponse.json(
        { message: "Session is required" },
        { status: 401 }
      );
    }

    await connectViaMongoose();
    const user = await User.findOne({ username });

    // * Check for username availability
    if (user) {
      return NextResponse.json(
        { message: "Username already exist.", alreadyExist: true },
        { status: 409 }
      );
    }

    // * Update record for user with matching email and without username
    const updatedUser = await User.findOneAndUpdate(
      {
        email: session.user?.email,
        username: { $exists: false },
      },
      { $set: { username } },
      { returnDocument: "after", upsert: false }
    );

    if (!updatedUser) {
      return NextResponse.json(
        {
          message: "User record not found or user already has a username.",
          alreadyExist: true,
        },

        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Username created successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
};
