import connectMongoose from "@/lib/mongodb";
import { GiftIdeas } from "@/model/gitfIdeas";
import { NextRequest, NextResponse } from "next/server";

const getDynamicParams = async (params: { _id: string }) => params;

const PUT = async (request: NextRequest, context: { params: { _id: string } }) => {
    try {
        const { _id: id } = await getDynamicParams(context.params);

        const { category, name, description, image, price_range } = await request.json();

        if (!category || !name || !description || !image || !price_range) {
            return NextResponse.json(
                { message: "missing required fields" },
                { status: 400 }
            );
        }

        await connectMongoose();
        const giftIdea = await GiftIdeas.findByIdAndUpdate(
            id, 
            {
                category, 
                name, 
                description, 
                image, 
                price_range
            }, 
            { new: true }
        );

        if (!giftIdea) {
            return NextResponse.json(
                { message: "Gift not found" },
                { status: 404 }
            )
        }
        return NextResponse.json(
            { message: "Gift updated successfully", giftIdea },
            { status: 201 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Error updating gift', error },
            { status: 500 }
        )
    }
}

const DELETE = async (request: NextRequest, context: { params: { _id: string } }) => {
    try {
        const { _id: id } = await getDynamicParams(context.params);
        if (!id) {
            return NextResponse.json(
                { message: "Gift ID required" },
                { status: 400 }
            );
        }

        await connectMongoose();
        await GiftIdeas.findByIdAndDelete(id);

       return NextResponse.json(
        { message: "Gift deleted successfully" },
        { status: 200 }
       )
    } catch (error) {
        return NextResponse.json(
            { message: "Error deleting gift", error },
            { status: 500 }
        )
    }
}

export { PUT, DELETE };