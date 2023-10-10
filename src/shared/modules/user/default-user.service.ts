import { DocumentType } from "@typegoose/typegoose";
import { CreateUserDto, UserEntity, UserModel } from "./index.js";
import { UserService } from "./user-service.interface.js";

export class DefaultUserService implements UserService {
  public async create(
    dto: CreateUserDto,
    salt: string
  ): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    return UserModel.create(UserEntity);
  }
}
