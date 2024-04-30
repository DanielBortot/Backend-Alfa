import { CreateUserDto } from "../dto";

export interface IDatabaseConnection {
  registerUser(createUserDto: CreateUserDto): boolean;

  checkExistingPassword(password: string): boolean;
}