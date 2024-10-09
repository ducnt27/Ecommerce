import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
        },
        full_name: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            min: 6,
            // required: true,
        },
        uid: {
            type: String,
            default: null,
        },
        avatarUrl: {
            type: String,
            default: "",
        },
        phone: {
            type: String,
        },
        birthDay: {
            type: String,
        },
        gender: {
            type: String,
        },
        is_admin: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
)
export default mongoose.model("User", userSchema)