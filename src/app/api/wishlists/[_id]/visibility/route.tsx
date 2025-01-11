import connectViaMongoose from "@/lib/mongodb";
import { WishList } from "@/model/wishList";
import { getDynamicParams } from "@/utils/dynamics";
import { NextRequest, NextResponse } from "next/server";

const PUT = async (
  request: NextRequest,
  { params }: { params: Promise<{ _id: string }> }
) => {
  try {
    const { _id: id } = await getDynamicParams(params);

    if (!id) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    await connectViaMongoose();
    const wishList = await WishList.findById(id);

    if (!wishList) {
      return NextResponse.json(
        { message: "WishList not found" },
        { status: 404 }
      );
    }

    await WishList.findOneAndUpdate(
      { _id: wishList.id },
      {
        visibility: wishList.visibility === "PUBLIC" ? "PRIVATE" : "PUBLIC",
      }
    );

    return NextResponse.json(
      { message: "Wishlist visibility updated", wishList },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating wishlist visibility: ", error },
      { status: 500 }
    );
  }
};

export { PUT };
