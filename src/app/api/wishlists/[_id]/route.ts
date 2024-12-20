import connectMongoose from "@/lib/mongodb";
import { WishItem } from "@/model/wishItems";
import { WishList } from "@/model/wishList";
import { getDynamicParams } from "@/utils/dynamics";
import { NextRequest, NextResponse } from "next/server";

const PUT = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { _id: wishlistId, items, ...wishlistUpdates } = body;

    if (!wishlistId || !wishlistUpdates) {
      return NextResponse.json(
        { message: "Missing required fields: wishlistId or updates" },
        { status: 400 }
      );
    }

    await connectMongoose();

    const wishlist = await WishList.findByIdAndUpdate(
      wishlistId,
      wishlistUpdates,
      {
        new: true,
      }
    );

    if (!wishlist) {
      return NextResponse.json(
        { message: "Wishlist not found" },
        { status: 404 }
      );
    }

    const existingItems = await WishItem.find({ wishlist: wishlistId });
    const existingItemIds = existingItems.map((item) => item._id.toString());

    // IDs of items sent from the UI
    const updatedItemIds = items
      .map((item: { _id: string }) => item._id)
      .filter(Boolean);

    // Identify items to delete
    const itemsToDelete = existingItemIds.filter(
      (id) => !updatedItemIds.includes(id)
    );

    // Delete items that are no longer in the updated list
    if (itemsToDelete.length > 0) {
      await WishItem.deleteMany({ _id: { $in: itemsToDelete } });
    }

    // Update existing items or create new ones
    for (const item of items) {
      if (item.id) {
        await WishItem.findOneAndUpdate(
          { _id: item.id, wishlist: wishlist._id },
          item,
          { new: true }
        );
      } else {
        await WishItem.create({ ...item, wishlist: wishlist._id });
      }
    }

    return NextResponse.json(
      { message: "Wishlist and items updated successfully!", wishlist },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating wishlist:", error);
    return NextResponse.json(
      {
        message: "Unhandled error updating wishlist",
        error: error instanceof Error ? error.message : String(error),
      },
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
        { message: "Wishlist ID is required" },
        { status: 400 }
      );
    }

    await connectMongoose();

    const wishlist = await WishList.findByIdAndDelete(id);

    if (!wishlist) {
      return NextResponse.json(
        { message: "Wishlist not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Wishlist deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting wishlist: ", error);
    return NextResponse.json(
      { message: "Error deleting wishlist" },
      { status: 500 }
    );
  }
};

export { PUT, DELETE };
