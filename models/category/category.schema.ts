import { Schema } from "mongoose";
import { ICategoryModel, ICategoryDocument } from "./category.types";

const CategorySchema = new Schema<ICategoryDocument, ICategoryModel>({
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

export default CategorySchema;
