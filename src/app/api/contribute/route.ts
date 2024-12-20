import connectViaMongoose from "@/lib/mongodb";
import { Contributor } from "@/model/contributors";
import { WishList } from "@/model/wishList";
import { NextRequest, NextResponse } from "next/server";

const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    if (!body.name || !body.wishlist) {
      return NextResponse.json(
        { message: "Missing a required field: name, wishlist." },
        { status: 400 }
      );
    }

    await connectViaMongoose();

    const wishlist = await WishList.findOne({ _id: body.wishlist });
    if (!wishlist || wishlist.endDate < Date.now()) {
      return NextResponse.json(
        { message: "Wishlist not found." },
        { status: 404 }
      );
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
