import connectViaMongoose from "@/lib/mongodb";
import { Logs } from "@/model/logs";
import { NextRequest, NextResponse } from "next/server";

const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { user_id, key, action, details } = body;

    if (!user_id || !key || !action || !details) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    await connectViaMongoose();

    const log = await Logs.create({ user_id, key, action, details });

    return NextResponse.json(
      { message: "Log created successfully", log },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating Log", error },
      { status: 500 }
    );
  }
};

export { POST };
