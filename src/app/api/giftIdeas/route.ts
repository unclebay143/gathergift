import connectMongoose from "@/lib/mongodb";
import { GiftIdeas } from "@/model/gitfIdeas";
import { NextRequest, NextResponse } from "next/server"

const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const { category, name, description, image, price_range } = body;

        if (!category || !name || !description || !image || !price_range) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            )
        };

        await connectMongoose();
        
        await GiftIdeas.create({ 
            category,
            name,
            description,
            image,
            price_range
        });

        return NextResponse.json(
            { message: "Gift successfully created" },
            { status: 200 }
        )
    } catch (error) {
        console.error("Error creating gift:",  error);
        return NextResponse.json(
            { message: "Error creating gift", error },
            { status: 500 }
        )
    }
}

export { POST }