import mongoose from 'mongoose'
import { IUserDocument, IUserModel } from "./user.types";
import UserSchema from "./user.schema";

export default mongoose.models.user as IUserModel || mongoose.model<IUserDocument, IUserModel>("user", UserSchema);