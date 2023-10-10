import { Document, Schema, model } from "mongoose";
import { User, UserType } from "../../types/index.js";

export interface UserDocument extends User, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: [2, "Min length for name is 2"],
      required: true,
    },
    email: {
      type: String,
      unique: true,
      match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Email is incorrect"],
      required: true,
    },
    avatarUrl: {
      type: String,
      minlength: [5, "Min length for avatar path is 5"],
      required: false,
    },
    type: {
      type: String,
      enum: Object.values(UserType),
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<UserDocument>("User", userSchema);
