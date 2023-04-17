import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema({
	chatUsers: { type: Array, require: true },
	message: { type: String, require: true },
	sender: { type: mongoose.SchemaTypes.ObjectId, require: true },
	timestamp: { type: Date, require: true },
});

export const User = mongoose.model("Message", messageSchema);
