import dbConnect from "@/lib/dbConnect"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import folderModel from "@/model/folder.model"
import mongoose from "mongoose"

// Update folder name
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ folderId: string }> }
) {
  try {
    await dbConnect()

    const session = await auth()

    if (!session || !session.user?._id) {
      return NextResponse.json(
        { message: "Unauthorized request" },
        { status: 401 }
      )
    }

    const { folderId } = await params

    if (!mongoose.Types.ObjectId.isValid(folderId)) {
      return NextResponse.json(
        { message: "Invalid folder id" },
        { status: 400 }
      )
    }

    const body = await req.json()
    const { name } = body

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { message: "Folder name is required" },
        { status: 400 }
      )
    }

    const existingFolder = await folderModel.findById(folderId)

    if (!existingFolder) {
      return NextResponse.json(
        { message: "Folder not found" },
        { status: 404 }
      )
    }

    if (existingFolder.userId.toString() !== session.user._id.toString()) {
      return NextResponse.json(
        { message: "Unauthorized request" },
        { status: 403 }
      )
    }

    existingFolder.name = name.trim()
    await existingFolder.save()

    return NextResponse.json(
      {
        folder: existingFolder,
        message: "Folder updated successfully",
      },
      { status: 200 }
    )
  } catch (err: any) {
    // if (err.code === 11000) {
    //   return NextResponse.json(
    //     { message: "Folder with this name already exists" },
    //     { status: 400 }
    //   )
    // }

    return NextResponse.json(
      { message: "Error updating folder" },
      { status: 500 }
    )
  }
}

// Delete folder
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ folderId: string }> }
) {
  try {
    await dbConnect()

    const session = await auth()

    if (!session || !session.user?._id) {
      return NextResponse.json(
        { message: "Unauthorized request" },
        { status: 401 }
      )
    }

    const { folderId } = await params

    if (!mongoose.Types.ObjectId.isValid(folderId)) {
      return NextResponse.json(
        { message: "Invalid folder id" },
        { status: 400 }
      )
    }

    const existingFolder = await folderModel.findById(folderId)

    if (!existingFolder) {
      return NextResponse.json(
        { message: "Folder not found" },
        { status: 404 }
      )
    }

    if (existingFolder.userId.toString() !== session.user._id.toString()) {
      return NextResponse.json(
        { message: "Unauthorized request" },
        { status: 403 }
      )
    }

    await folderModel.findByIdAndDelete(folderId)

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