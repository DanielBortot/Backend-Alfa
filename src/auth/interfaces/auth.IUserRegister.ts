import { User } from "src/user/entities/user.entity";
import { CreateUserDto, LoginUserDto } from "../dto";
import { loggedUser } from "../types/loggedUser.type";

export interface IDatabaseConnection {
  registerUser(createUserDto: CreateUserDto): Promise<loggedUser>;

  loginUser(loginUserDto: LoginUserDto): Promise<loggedUser>

  checkExistingEmail(email: string): Promise<User | null>;
}