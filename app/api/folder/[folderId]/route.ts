import dbConnect from "@/lib/dbConnect"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import folderModel from "@/model/folder.model"
// Update folder name
export async function PATCH(
    req: NextRequest,
    { params }: { params: { folderId: string } }
) {
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
        const { folderId } = params

        const body = await req.json()
        const { name } = body

        if (!name || name.trim() === "") {
            return NextResponse.json(
                { message: "folder name is required" },
                { status: 400 }
            )
        }

        const updatedFolder = await folderModel.findOneAndUpdate(
            { _id: folderId, userId }, //  ensures user owns folder
            { name: name.trim() },
            { new: true }
        )

        if (!updatedFolder) {
            return NextResponse.json(
                { message: "Folder not found or unauthorized" },
                { status: 404 }
            )
        }

        return NextResponse.json(
            {
                folder: updatedFolder,
                message: "Folder updated successfully"
            },
            { status: 200 }
        )

    } catch (err: any) {
        if (err.code === 11000) {
            return NextResponse.json(
                { message: "Folder with this name already exists" },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: "Error updating folder" },
            { status: 500 }
        )
    }
}

// Delete folder
export async function DELETE(
    req: NextRequest,
    { params }: { params: { folderId: string } }
) {
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
        const { folderId } = params

        const deletedFolder = await folderModel.findOneAndDelete({
            _id: folderId,
            userId //  security check
        })

        if (!deletedFolder) {
            return NextResponse.json(
                { message: "Folder not found or unauthorized" },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { message: "Folder deleted successfully" },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { message: "Error deleting folder" },
            { status: 500 }
        )
    }
}