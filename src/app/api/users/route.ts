import connectViaMongoose from "@/lib/mongodb";
import { User } from "@/model/users";
import { NextRequest, NextResponse } from "next/server";

const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { first_name, last_name, password, email, profile_picture } = body;

    if (!first_name || !last_name || !password || !email || !profile_picture) {
      return NextResponse.json(
        { message: "Missing fields required" },
        { status: 400 }
      );
    }
    await connectViaMongoose();

    await User.create({
      first_name,
      last_name,
      password,
      email,
      profile_picture,
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating user", error },
      { status: 500 }
    );
  }
};

export { POST };
