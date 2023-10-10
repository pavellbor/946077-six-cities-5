import { defaultClasses, getModelForClass, prop } from "@typegoose/typegoose";
import { User, UserType } from "../../types/index.js";

export interface UserEntity extends defaultClasses.Base {}
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: true, minlength: 1, maxlength: 15 })
  public name: string = "";

  @prop({ required: false, default: "" })
  public avatarUrl: string = "";

  @prop({ unique: true, required: true })
  public email: string = "";

  @prop({ required: true })
  public type: UserType = UserType.Standart;
}

export const UserModel = getModelForClass(UserEntity);
