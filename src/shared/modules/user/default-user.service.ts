import { DocumentType } from "@typegoose/typegoose";
import { CreateUserDto, UserEntity, UserModel } from "./index.js";
import { UserService } from "./user-service.interface.js";
import { inject, injectable } from "inversify";
import { Component } from "../../types/component.enum.js";
import { Logger } from "../../libs/logger/index.js";

@injectable()
export class DefaultUserService implements UserService {
  constructor(@inject(Component.Logger) private readonly logger: Logger) {}

  public async create(
    dto: CreateUserDto,
    salt: string
  ): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await UserModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }
}
