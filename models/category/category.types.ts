import { Document, Model } from "mongoose";

export interface ICategory {
  name: string;
  create_date?: Date;
}

export interface ICategoryDocument extends ICategory, Document {}

export interface ICategoryModel extends Model<ICategoryDocument> {}
