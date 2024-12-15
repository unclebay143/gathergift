import connectMongoose from "@/lib/mongodb";
import { WishItem } from "@/model/wishItems";
import { Wish } from "@/model/wish";
import { NextRequest, NextResponse } from "next/server";
import { getServerSessionWithAuthOptions } from "@/utils/nextAuth.config";
import { User } from "@/model/users";

const POST = async (request: NextRequest) => {
  try {
    const wish = await request.json();

    const { title, category, items } = wish;

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

    await connectMongoose();
    const user = await User.findOne({ email: session.user?.email });

    // Separate items from the rest of the wish data
    const { items: excludeItemsFromWish, ...restOfWish } = wish;

    let wishlist;
    try {
      wishlist = await Wish.create({
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
    await connectMongoose();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "No user found " }, { status: 404 });
    }
    // Todo: populate the items of each wishes using aggregates before sending to client
    const wishes = await Wish.find({ owner: user._id });

    const wishesWithItems = await Wish.aggregate([
      { $match: { owner: user._id } },
      {
        $lookup: {
          from: "wishitems",
          localField: "_id",
          foreignField: "wish",
          as: "items",
        },
      },
    ]);

    console.log(wishesWithItems);

    return NextResponse.json(wishes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching wishes", error },
      { status: 500 }
    );
  }
};

export { POST, GET };
