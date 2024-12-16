import connectMongoose from "@/lib/mongodb";
import { Wish } from "@/model/wish";
import { getDynamicParams } from "@/utils/dynamics"
import { NextRequest, NextResponse } from "next/server"

const PUT = async (request: NextRequest, { params }: { params: Promise<{ _id: string }> }) => {
    try {
        const { _id: id } = await getDynamicParams(params);

        if (!id) {
            return NextResponse.json(
                { message: "Invalid ID" },
                { status: 400 }
            )
        }

        await connectMongoose();
        const wish = await Wish.findById(id);

        if (!wish) {
            return NextResponse.json(
                { message: "Wish not found" },
                { status: 404 }
            );
        }

        wish.isArchived = !wish.isArchived;
        await wish.save();

        return NextResponse.json(
            { message: "Wish updated successfully", wish },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Error updating wish: ", error },
            { status: 500 }
        )
    }
}

export { PUT }