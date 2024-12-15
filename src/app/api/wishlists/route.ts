import connectMongoose from "@/lib/mongodb";
import { WishItem } from "@/model/wishItems";
import { Wish } from "@/model/wish";
import { NextRequest, NextResponse } from "next/server";

const POST = async (request: NextRequest) => {
  try {
    const wish = await request.json();
    const { owner, title, category, items } = wish;

    if (!owner || !title || !category) {
      return NextResponse.json(
        { message: "Missing required fields: owner, title, or category" },
        { status: 400 }
      );
    }

    if (items && !Array.isArray(items)) {
      return NextResponse.json(
        { message: "Items must be an array" },
        { status: 400 }
      );
    }

    await connectMongoose();

    // Separate items from the rest of the wish data
    const { items: excludeItemsFromWish, ...restOfWish } = wish;

    let wishlist;
    try {
      wishlist = await Wish.create(restOfWish);
    } catch (err) {
      console.error("Error creating wishlist:", err);
      return NextResponse.json(
        {
          message: "Error creating wishlist",
          error: err instanceof Error ? err.message : String(err),
        },
        { status: 500 }
      );
    }

    if (Array.isArray(items) && items.length > 0) {
      const itemsToInsert = items.map((item) => ({
        ...item,
        wish: wishlist._id,
      }));

      try {
        await WishItem.insertMany(itemsToInsert);
      } catch (err) {
        console.error("Error creating wishlist items:", err);
        return NextResponse.json(
          {
            message: "Error creating wishlist items",
            error: err instanceof Error ? err.message : String(err),
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { message: "Wishlist created successfully!", wishlist },
      { status: 201 }
    );
  } catch (error) {
    console.error("Unhandled error creating wishlist:", error);
    return NextResponse.json(
      {
        message: "Unhandled error creating wishlist",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
};

export { POST };
