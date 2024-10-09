import mongoose from "mongoose";

const RefreshTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    token: {
        type: String,
        required: true,
    }
}, { timestamps: true })
export default mongoose.model("RefreshToken", RefreshTokenSchema)