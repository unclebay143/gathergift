import connectMongoose from "@/lib/mongodb";
import { WishLists } from "@/model/wishlists";
import { NextRequest, NextResponse } from "next/server";

interface WishlistRequest { 
    user_id: string; 
    name: string; 
    occasion: string; 
    items: { 
        title: string; 
        description?: string; 
        image_url?: string; 
        target_amount: string; 
        currency?: string;
        contributed_amount?: string; 
        contributors?: { 
            name: string; 
            amount: number; 
            contribution_date?: string; 
            note?: string; 
        }[]; 
        status: 'open' | 'completed' | 'closed'; 
    }[]; 
    
}

const POST = async (request: NextRequest) => {
    try {
        const body: WishlistRequest = await request.json();
        const { user_id, name, occasion, items } = body;

        if (!user_id || !name || !occasion || !items) {
            return NextResponse.json(
                { message: "Missing required fields"},
                { status: 400 }
            );
        }
        await connectMongoose();

        const wishlist = await WishLists.create(body);

        return NextResponse.json(
            { message: 'Wishlist created Successfully!', wishlist },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating wishlist", error);
        return NextResponse.json(
            { message: "Error creating wishlist", error },
            { status: 500 }
        )
    }
}

export { POST }