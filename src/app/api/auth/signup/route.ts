import connectViaMongoose from "@/lib/mongodb";
import { User } from "@/model/users";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

const POST = async (request: NextRequest) => {
  try {
    const { email, password, confirmPassword } = await request.json();
    if (![email, password, confirmPassword].every(Boolean)) {
      return NextResponse.json(
        {
          message:
            "All fields (email, password, confirm password) are required.",
        },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Password mismatch with Confirm Password" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 12);

    await connectViaMongoose();

    const emailExistence = await User.countDocuments({ email });

    if (emailExistence > 0) {
      return NextResponse.json(
        { message: "User already exist" },
        { status: 403 }
      );
    }

    const user = await User.create({
      email,
      password: hashedPassword,
      authProvider: "credentials",
    });

    if (user) {
      return NextResponse.json(
        { message: "User created successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating user", error },
      { status: 500 }
    );
  }
};

export { POST };
