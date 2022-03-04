import { Document, Model, Types } from "mongoose";

export type CoursePrice = {
	price: number;
	credit_price: number;
};

export interface ICourse {
	name: string;
	description: string;
	category: Types.ObjectId | string;
	image: string;
	subject: string;
	instructor: [Types.ObjectId] | [string];
	price: CoursePrice;
	start_time: number;
	end_time: number;
	number_of_student: number;
	create_date?: Date;
	update_date?: Date;
}

export interface ICourseDocument extends ICourse, Document {}

export interface ICourseModel extends Model<ICourseDocument> {}
