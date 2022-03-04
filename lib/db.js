import mongoose from "mongoose";

const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI) {
	throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

if (!MONGODB_DB) {
	throw new Error("Please define the MONGODB_DB environment variable inside .env.local");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

export default async function dbConnect() {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		cached.promise = await mongoose
			.connect(MONGODB_URI)
			.then((mongoose) => {
				return mongoose;
			})
			.catch((error) => {
				console.log(error);
				throw new Error(error);
			});
	}
	cached.conn = await cached.promise;
	return cached.conn;
}
