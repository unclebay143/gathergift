import connectViaMongoose from "@/lib/mongodb";
import { GiftIdeas } from "@/model/gitfIdeas";
import { getDynamicParams } from "@/utils/dynamics";
import { NextRequest, NextResponse } from "next/server";

const PUT = async (
  request: NextRequest,
  { params }: { params: Promise<{ _id: string }> }
) => {
  try {
    const { _id: id } = await getDynamicParams(params);

    const { category, name, description, image, price_range } =
      await request.json();

    if (!category || !name || !description || !image || !price_range) {
      return NextResponse.json(
        { message: "missing required fields" },
        { status: 400 }
      );
    }

    await connectViaMongoose();
    const giftIdea = await GiftIdeas.findByIdAndUpdate(
      id,
      {
        category,
        name,
        description,
        image,
        price_range,
      },
      { new: true }
    );

    if (!giftIdea) {
      return NextResponse.json({ message: "Gift not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Gift updated successfully", giftIdea },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating gift", error },
      { status: 500 }
    );
  }
};

const DELETE = async (
  request: NextRequest,
  { params }: { params: Promise<{ _id: string }> }
) => {
  try {
    const { _id: id } = await getDynamicParams(params);
    if (!id) {
      return NextResponse.json(
        { message: "Gift ID required" },
        { status: 400 }
      );
    }

    await connectViaMongoose();
    await GiftIdeas.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Gift deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting gift", error },
      { status: 500 }
    );
  }
};

export { PUT, DELETE };
