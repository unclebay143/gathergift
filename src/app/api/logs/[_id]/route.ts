import connectMongoose from "@/lib/mongodb";
import { Logs } from "@/model/logs";
import { NextRequest, NextResponse } from "next/server"

const getDynamicParams = async (params: { _id: string }) => params;

const PUT = async (request: NextRequest, context: { params: { _id: string } }) => {
    try {
        const { _id: id } = await getDynamicParams(context.params);
        const body = await request.json();
        const { user_id, action, details, key } = body;

        if (!user_id || !action || !details || !key) {
            return NextResponse.json(
                { message: "Missing fields are required" },
                { status: 400 }
            );
        }
        await connectMongoose();

        await Logs.findByIdAndUpdate(
            id,
            {
                user_id,
                action,
                details,
                key
            },
            { new: true }
        );

        return NextResponse.json(
            { message: "Log updated successfully" },
            { status: 201 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "Error updating Log", error },
            { status: 500 }
        )
    }
}


const DELETE = async (request: NextResponse, context: { params: { _id: string } }) => {
    try {
        const { _id: id } = await getDynamicParams(context.params);
        if (!id) {
            return NextResponse.json(
                { message: "Log ID required" },
                { status: 400 }
            );
        }

        await connectMongoose();
        await Logs.findByIdAndDelete(id);

        return NextResponse.json(
            { message: "Log deleted successfully" },
            { status: 201 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: "Error deleting log", error },
            { status: 500 }
        )
    }
}

export { PUT, DELETE }