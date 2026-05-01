import dbConnect from "@/lib/dbConnect";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import linkModel from "@/model/link.model";
import folderModel from "@/model/folder.model";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
    try {
       
        await dbConnect();

        //  Get current logged-in user session
        const session = await auth();

        //  If no session → block request
        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized request" },
                { status: 401 }
            );
        }

        //  Extract userId from session (used for security filtering)
        const userId = session.user._id;

        //  Get query params from URL
        
        const { searchParams } = new URL(req.url);
        const folderId = searchParams.get("folderId");

        // Default filter → return all links of user
        let filter: any = { userId };

        // If folderId exists → apply extra filtering
        if (folderId) {

            // 7.1 Validate MongoDB ObjectId format
            if (!mongoose.Types.ObjectId.isValid(folderId)) {
                return NextResponse.json(
                    { message: "Invalid folder id" },
                    { status: 400 }
                );
            }

            // Check if folder belongs to the logged-in user
            const folder = await folderModel.findOne({
                _id: folderId,
                userId,
            });

            // If folder doesn't exist or doesn't belong to user → reject
            if (!folder) {
                return NextResponse.json(
                    { message: "Folder not found" },
                    { status: 404 }
                );
            }

            // Add folderId to filter
            filter.folderId = folderId;
        }

        // Fetch links based on filter (all OR folder-specific)
        const links = await linkModel
            .find(filter)
            .sort({ createdAt: -1 }); // newest first

        // Send response
        return NextResponse.json(
            {
                data: links,
                message: folderId
                    ? "Folder links fetched successfully"
                    : "Links fetched successfully",
            },
            { status: 200 }
        );

    } catch (error) {
        // Catch any unexpected server errors
        return NextResponse.json(
            { message: "Error fetching links" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect()

        const session = await auth()

        if (!session) {
            return NextResponse.json(
                { message: "unauthorized request" },
                { status: 401 }
            )
        }

        const body = await req.json()

        const { url, description, folderId } = body;

        const userId = session.user._id

        // url must exist
        if (!url.trim()) {
            return NextResponse.json(
                { message: "URL is required" },
                { status: 400 }
            )
        }

        // validate the filderid
        if (folderId) {
            if (!mongoose.Types.ObjectId.isValid(folderId)) {
                return NextResponse.json(
                    { message: "invalid folderid" },
                    { status: 400 }
                )
            }

            // Make sure folder belongs to logged-in user
            const folder = await folderModel.findOne({
                _id: folderId,
                userId
            })

            if (!folder) {
                return NextResponse.json(
                    { message: "folder not found or unauthorized" },
                    { status: 404 }
                )
            }
        }



        const newLink = await linkModel.create({
            url: url.trim(),
            description: description?.trim() || "",
            userId,
            folderId: folderId || null
        })

        return NextResponse.json(
            {
                message: "Link created successfully",
                link: newLink
            },
            { status: 201 }
        )
    }

    catch (error: any) {
        return NextResponse.json(
            { message: "Error creating link" },
            { status: 500 }
        )
    }
}