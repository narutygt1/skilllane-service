import mongoose from "mongoose";
import { ICategoryDocument, ICategoryModel } from "./category.types";
import CategorySchema from "./category.schema";

export default (mongoose.models.category as ICategoryModel) ||
	mongoose.model<ICategoryDocument, ICategoryModel>("category", CategorySchema);
