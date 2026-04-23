import dbConnect from "@/lib/dbConnect";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import linkModel from "@/model/link.model";
import folderModel from "@/model/folder.model";
import mongoose from "mongoose";

export async function GET(){
    try{
        await dbConnect()
        const session = await auth()

        if (!session){
            return NextResponse.json(
                {message: "unauthorized request"},
                {status: 401}
            )
        }

        const userId= session.user._id

        const links = await linkModel.find({userId}).sort({createdAt: -1})

        return NextResponse.json(
            {
                links,
                message:"links fetched successfully"
            },
            { status: 200 }
        )




    }
    catch(error:any){
        return NextResponse.json(
            {message: "Error fetching links" },
            {status: 500}
        )

    }

}

export async function POST(req: NextRequest){
    try{
        await dbConnect()

        const session = await auth()

        if (!session){
            return NextResponse.json(
                {message: "unauthorized request"},
                {status: 401}
            )
        }

        const body= await req.json()

        const {url, description, folderId} = body;

        const userId = session.user._id

        // url must exist
        if (!url.trim()){
            return NextResponse.json(
                {message: "URL is required"},
                {status: 400}
            )
        }

        // validate the filderid
        if (folderId){
            if (!mongoose.Types.ObjectId.isValid(folderId)){
                return NextResponse.json(
                    {message: "invalid folderid"},
                    {status: 400}
                )
            }
        }

        // Make sure folder belongs to logged-in user
        const folder = await folderModel.findOne({
            _id: folderId,
            userId
        })

        if (!folder) {
            return NextResponse.json(
                {message: "folder not found or unauthorized"},
                {status: 404}
            )
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
            {status: 201}
        )
    }

    catch(error:any){
        return NextResponse.json(
            {message: "Error creating link"},
            {status: 500}
        )
    }
}