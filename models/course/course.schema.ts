import { Schema } from "mongoose";
import { ICourseModel, ICourseDocument } from "./course.types";

const CourseSchema = new Schema<ICourseDocument, ICourseModel>({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		default: "",
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: "category",
		required: true,
	},
	image: {
		type: String,
		default: "",
	},
	instructor: [
		{
			type: Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
	],
	subject: {
		type: String,
		required: true,
	},
	price: {
		type: Schema.Types.Mixed,
		required: true,
		default: {
			price: 0,
			credit_price: 0,
		},
	},
	start_time: {
		type: Number,
		required: true,
		default: 0,
	},
	end_time: {
		type: Number,
		required: true,
		default: 0,
	},
	number_of_student: {
		type: Number,
		required: true,
		default: 0,
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

export default CourseSchema;
