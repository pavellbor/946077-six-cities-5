import { Document, Schema, model } from "mongoose";
import { User } from "../../types/index.js";

export interface UserDocument extends User, Document {}

const userSchema = new Schema({
  name: String,
  email: String,
  avatarUrl: String,
  type: String,
});

export const UserModel = model<UserDocument>("User", userSchema);
