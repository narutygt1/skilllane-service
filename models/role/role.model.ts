import mongoose from 'mongoose'
import { IRoleDocument, IRoleModel } from "./role.types";
import RoleSchema from "./role.schema";

export default mongoose.models.role as IRoleModel || mongoose.model<IRoleDocument, IRoleModel>("role", RoleSchema);