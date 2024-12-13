import connectMongoose from "@/lib/mongodb";
import { WishLists } from "@/model/wishlists";
import { getDynamicParams } from "@/utils/dynamics";
import { NextRequest, NextResponse } from "next/server"



const PUT = async (request: NextRequest, context: { params: { _id: string } }) => {
    try {
        const { _id: id } = await getDynamicParams(context.params);

        const body = await request.json();

        if (!id) {
            return NextResponse.json(
                { message: "missing fields required" },
                { status: 400 }
            );
        }

        await connectMongoose();
        const wishlist = await WishLists.findByIdAndUpdate(id, body, { new: true });

        if (!wishlist) {
            return NextResponse.json(
                { message: "Wishlist not found" },
                { status: 404 }
            )
        }
        return NextResponse.json(
            { message: "Wishlist updated successfully", wishlist},
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating wishlist: ", error);
        return NextResponse.json(
            { message: "Error updating wishlist", error },
            { status: 500 }
        );
    }
};

const DELETE = async (request: NextRequest,  context: { params: { _id: string } }) => {
    try {
        const { _id: id } = await getDynamicParams(context.params);

       if (!id) {
            return NextResponse.json(
                { message: "Wishlist ID is required" },
                { status: 400 }
            )
        }

        await connectMongoose();

        const wishlist = await WishLists.findByIdAndDelete(id);

        if (!wishlist) {
            return NextResponse.json(
                { message: "Wishlist not found" },
                { status: 404 }
            )
        }
        return NextResponse.json(
            { message: "Wishlist deleted successfully" },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error deleting wishlist: ", error);
        return NextResponse.json(
            { message: "Error deleting wishlist" },
            { status: 500 }
        )
    }
}

export { PUT, DELETE }