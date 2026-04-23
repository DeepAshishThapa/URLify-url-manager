import mongoose, { Schema } from 'mongoose'

export interface UserObject extends mongoose.Document {
    username: string,
    email: string,
    password: string,
    verifyCode: string,
    isVerified: boolean,
    verifyCodeExpiry: Date;
    provider: "credentials" | "google"

}

const userSchema: Schema<UserObject> = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            trim: true,
            unique: true
        },

        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,

        },
        password: {
            type: String,
            required: false,


        },
        verifyCode: {
            type: String,
            required: false
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        verifyCodeExpiry: {
            type: Date,
            required: false,
        },
        provider: {
            type: String,
            enum: ["credentials", "google"],
            default: "credentials"
        }

    }
)

const UserModel =
    (mongoose.models.User as mongoose.Model<UserObject>) ||
    mongoose.model<UserObject>('User', userSchema);

export default UserModel;         
