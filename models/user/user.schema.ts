import { Schema } from "mongoose";
import { IUserModel, IUserDocument } from "@/models/user/user.types";

const UserSchema = new Schema<IUserDocument, IUserModel>({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: Schema.Types.ObjectId,
		ref: "role",
		required: true,
	},
	firstname: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true,
	},
	nickname: {
		type: String,
		required: true,
	},
	birthday: {
		type: Date,
		default: new Date(),
	},
	gender: {
		type: String,
		required: true,
	},
	create_date: {
		type: Date,
		default: new Date(),
	},
	update_date: {
		type: Date,
		default: new Date(),
	},
});

export default UserSchema;
