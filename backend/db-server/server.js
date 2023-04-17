import mongoose from "mongoose";
import app from "./app.js";

mongoose.set("strictQuery", false);

const PORT = 5050;

try {
	await mongoose.connect(
		"mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.3.1"
	);
	app.listen(PORT, () => {
		if (process.env.NODE_ENV === "development") {
			console.log(`Server running on http://localhost:${PORT}`);
		}
	});
} catch (error) {
	console.log(error);
}
