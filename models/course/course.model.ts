import mongoose from "mongoose";
import { ICourseDocument, ICourseModel } from "./course.types";
import CourseSchema from "./course.schema";

export default (mongoose.models.course as ICourseModel) ||
	mongoose.model<ICourseDocument, ICourseModel>("course", CourseSchema);
