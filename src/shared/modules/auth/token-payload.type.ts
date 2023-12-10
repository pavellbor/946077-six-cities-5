import { UserType } from '../../types/index.js';

export type TokenPayload = {
  email: string;
  type: UserType;
  id: string;
};
