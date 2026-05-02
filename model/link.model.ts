import mongoose,{Schema} from "mongoose"


export interface LinkObject extends mongoose.Document{
    url: string,
    description?: string,
    folderId?: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId

}

const linkSchema: Schema<LinkObject> = new Schema(
    {
        url:{
            type:String,
            required:[true, 'url is required'],
            trim: true

        },
        description:{
            type:String,
            trim: true 
        },
        userId:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required:true
        },
        folderId:{
            type: Schema.Types.ObjectId,
            ref: "Folder",
            required: false,
            default: null

        }


    },
    { timestamps: true }
)
    
const linkModel = (mongoose.models.Link as mongoose.Model<LinkObject>) ||
    mongoose.model<LinkObject>('Link', linkSchema );

export default linkModel





