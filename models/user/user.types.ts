import { Document, Model, Types } from "mongoose";

export interface IUser {
  username: string;
  password: string;
  role: Types.ObjectId | string;
  firstname: string;
  lastname: string;
  nickname: string;
  gender: "male" | "female";
  birthday: Date;
  create_date?: Date;
  update_date?: Date;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {}
