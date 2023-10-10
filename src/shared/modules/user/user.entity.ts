import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";
import { User, UserType } from "../../types/index.js";
import { createSHA256 } from "../../helpers/index.js";

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: "users",
  },
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: true, minlength: 1, maxlength: 15 })
  public name: string;

  @prop({ required: false, default: "" })
  public avatarUrl: string;

  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: true, enum: UserType })
  public type: UserType;

  @prop({ required: true })
  private password?: string;

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.name = userData.name;
    this.avatarUrl = userData.avatarUrl;
    this.type = userData.type;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
