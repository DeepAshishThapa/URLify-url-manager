import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import linkModel from "@/model/link.model";
import mongoose from "mongoose";

// delete folder
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ linkId: string }> }
) {
    try {
        await dbConnect()

        const session = await auth()

        if (!session || !session.user?._id) {
            return NextResponse.json(
                { message: "Unauthorized access" },
                { status: 401 }

            )
        }

        const { linkId } = await params

        if (!mongoose.Types.ObjectId.isValid(linkId)) {
            return NextResponse.json(
                { message: "Invalid link id" },
                { status: 400 }
            )
        }

        const existingLink = await linkModel.findById(linkId)

        if (!existingLink) {
            return NextResponse.json(
                { message: "Link not found" },
                { status: 404 }
            )
        }

        if (session.user._id.toString() !== existingLink.userId.toString()) {
            return NextResponse.json(
                { message: "unauthorized request" },
                { status: 403 }
            )

        }

        await linkModel.findByIdAndDelete(linkId)

        return NextResponse.json(
            { message: "link deleted successfully" },
            { status: 200 }
        )


    }
    catch (error) {
        return NextResponse.json(
            { message: "Error deleting link" },
            { status: 500 }
        )
    }

}


