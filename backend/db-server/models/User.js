import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
	username: String,
	email: String,
	contacts: [mongoose.SchemaTypes.ObjectId],
});

export const User = mongoose.model("User", userSchema);
