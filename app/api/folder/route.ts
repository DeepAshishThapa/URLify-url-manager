import dbConnect from "@/lib/dbConnect"
import { NextRequest, NextResponse } from "next/server"
import folderModel from "@/model/folder.model"
import { auth } from "@/lib/auth"

// fetch all user's folders
export async function GET() {
    try {
        await dbConnect()
        const session = await auth()

        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized request" },
                { status: 401 }
            )
        }

        const userId = session.user._id

        const folders = await folderModel.find({ userId }).sort({ createdAt: -1 })

        return NextResponse.json({
            folders,
            message: "folders fetched successfully",
        },
            { status: 200 }
        )
    }

    catch (error: any) {
        return NextResponse.json(
            { message: "Error fetching folders" },
            { status: 500 }
        )
    }
}

// Create folder
export async function POST(req: NextRequest) {
    try {
        await dbConnect()

        const session = await auth()

        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized request" },
                { status: 401 }
            )
        }

        const userId = session.user._id

        const body = await req.json()

        const { name } = body

        if (!name || name.trim() === "") {
            return NextResponse.json(
                { message: "folder name is required" },
                { status: 400 }
            )
        }

        const folder = await folderModel.create({
            name: name.trim(),
            userId,
        })

        return NextResponse.json(
            {
                folder,
                message: "folder created successfully"
            },
            { status: 201 }
        )

    }
    catch (err: any) {
        //Duplicate folder name 
        // if (err.code === 11000) {
        //     return NextResponse.json(
        //         { message: "Folder with this name already exists" },
        //         { status: 400 }
        //     );
        // }

        return NextResponse.json(
            {message: "Error creating folder"},
            {status: 500}
        )
    }

}
