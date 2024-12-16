import connectMongoose from "@/lib/mongodb";
import { Contributor } from "@/model/contributors";
import { Wish } from "@/model/wish";
import { NextRequest, NextResponse } from "next/server";

const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    if (!body.name || !body.wish) {
      return NextResponse.json(
        { message: "Missing required fields: name, wish, or details." },
        { status: 400 }
      );
    }

    await connectMongoose();

    const wish = await Wish.findOne({ _id: body.wish });
    if (!wish || wish.endDate < Date.now()) {
      return NextResponse.json({ message: "Wish not found." }, { status: 404 });
    }

    await Contributor.create(body);

    return NextResponse.json(
      { message: "Contribution successful." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Unhandled error making contribution:", error);

    return NextResponse.json(
      {
        message: "Unhandled error making contribution",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
};

export { POST };
