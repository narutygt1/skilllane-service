import { Document, Model } from "mongoose";

export interface IRole {
  name: string;
  create_date?: Date;
}

export interface IRoleDocument extends IRole, Document {}

export interface IRoleModel extends Model<IRoleDocument> {}
