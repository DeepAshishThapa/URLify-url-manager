import mongoose, { Schema } from "mongoose";

export interface FolderObject extends mongoose.Document {
    name: string,
    userId: mongoose.Types.ObjectId
}

const folderSchema: Schema<FolderObject> = new Schema(
    {
        name: {
            type: String,
            required: [true, 'name is required'],
            trim: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, 'user is required'],

        }
    },
    { timestamps: true }
)

const folderModel = (mongoose.models.Folder as mongoose.Model<FolderObject>) ||
    mongoose.model<FolderObject>('Folder', folderSchema);

export default folderModel
