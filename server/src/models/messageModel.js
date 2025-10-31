
import mongoose from "mongoose";
import User from "./userModel";
const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    read: {
        type: Boolean,
        default: false,
    }
});

const Msg = mongoose.model('Message', messageSchema);

export default Msg