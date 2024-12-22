import connectViaMongoose from "@/lib/mongodb";
import { WishItem } from "@/model/wishItems";
import { WishList } from "@/model/wishList";
import { NextRequest, NextResponse } from "next/server";
import { getServerSessionWithAuthOptions } from "@/utils/nextAuth.config";
import { User } from "@/model/users";

const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const { title, category, items } = body;

    if (!title || !category) {
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

    const session = await getServerSessionWithAuthOptions();

    if (!session) {
      return NextResponse.json(
        { message: "Missing required fields: owner, title, or category" },
        { status: 404 }
      );
    }

    await connectViaMongoose();
    const user = await User.findOne({ email: session.user?.email });

    // Separate items from the rest of the wishlist data
    const { items: excludeItemsFromWish, ...restOfWish } = body;
    void excludeItemsFromWish; // prevent ts from erroring unused value

    let wishlist;
    try {
      wishlist = await WishList.create({
        owner: user._id,
        status: "ONGOING",
        ...restOfWish,
      });
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
        wishlist: wishlist._id,
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
    return NextResponse.json(
      {
        message: "Unhandled error creating wishlist",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
};

const GET = async () => {
  try {
    const session = await getServerSessionWithAuthOptions();
    const email = session?.user?.email;

    if (!session) {
      return NextResponse.json(
        { message: "Session is required" },
        { status: 400 }
      );
    }
    await connectViaMongoose();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "No user found " }, { status: 404 });
    }

    const wishlists = await WishList.aggregate([
      { $match: { owner: user._id } },
      {
        $lookup: {
          from: "wishitems",
          localField: "_id",
          foreignField: "wishlist",
          as: "items",
        },
      },
    ]);

    return NextResponse.json(wishlists, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching wishlists", error },
      { status: 500 }
    );
  }
};

export { POST, GET };
