import connectViaMongoose from "@/lib/mongodb";
import { User } from "@/model/users";
import { getDynamicParams } from "@/utils/dynamics";
import { getServerSessionWithAuthOptions } from "@/utils/nextAuth.config";
import { NextRequest, NextResponse } from "next/server";

// Do we need this?
const GET = async () => {
  try {
    const session = await getServerSessionWithAuthOptions();
    const email = session?.user?.email;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }
    await connectViaMongoose();

    const getUserProfile = await User.findOne({ email });

    if (!getUserProfile) {
      return NextResponse.json({ message: "No user found " }, { status: 404 });
    }

    return NextResponse.json(getUserProfile, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching user", error },
      { status: 500 }
    );
  }
};

const PUT = async (
  request: NextRequest,
  { params }: { params: Promise<{ _id: string }> }
) => {
  try {
    const { _id: id } = await getDynamicParams(params);
    const body = await request.json();
    const { first_name, last_name, password, email, profile_picture } = body;

    if (!id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    await connectViaMongoose();
    await User.findByIdAndUpdate(
      id,
      {
        first_name,
        last_name,
        password,
        email,
        profile_picture,
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "User profile updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating user profile", error },
      { status: 500 }
    );
  }
};

export { GET, PUT };
