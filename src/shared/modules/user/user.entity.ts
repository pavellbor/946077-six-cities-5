import { User, UserType } from "../../types/index.js";

export class UserEntity implements User {
  public name: string = '';
  public avatarUrl: string = '';
  public email: string = '';
  public type: UserType = UserType.Standart;
}
