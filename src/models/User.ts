import { Role, ROLES } from "@/constants/roles";
import mongoose, { model, models, Schema } from "mongoose";

interface IUser{
    name: string;
    email: string;
    password: string;
    role: Role;
    semester?: number;
}

const userSchema = new Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum: Object.values(ROLES),
        default: ROLES.STUDENT,
    },
    semester: {
        type: Number,
        min:1,
        max:8
    }
}, {timestamps: true});

const User = models.User || model<IUser>("User", userSchema);
export default User;