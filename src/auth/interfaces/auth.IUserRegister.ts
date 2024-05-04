import { CreateUserDto, LoginUserDto } from "../dto";
import { User } from "../entities/user.entity";
import { loggedUser } from "../types/loggedUser.type";

export interface IDatabaseConnection {
  registerUser(createUserDto: CreateUserDto): Promise<loggedUser>;

  loginUser(loginUserDto: LoginUserDto): Promise<loggedUser>

  checkExistingEmail(email: string): Promise<User | null>;
}