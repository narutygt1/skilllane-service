import { Schema } from "mongoose";
import { IRoleModel, IRoleDocument } from "./role.types";

const RoleSchema = new Schema<IRoleDocument, IRoleModel>({
	name: {
		type: String,
		required: true,
	},
	display: {
		type: String,
		required: true,
	},
	create_date: {
		type: Date,
		default: new Date(),
	},
});

export default RoleSchema;
