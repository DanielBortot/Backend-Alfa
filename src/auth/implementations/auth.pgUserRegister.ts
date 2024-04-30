import { Repository } from "typeorm";
import { CreateUserDto } from "../dto";
import { IDatabaseConnection as IUserHandler } from "../interfaces/auth.IUserRegister";
import { User } from "../entities/user.entity";

export class PgUserHandler implements IUserHandler {
  private users: Repository<User>;
  constructor(users: Repository<User>) {
    this.users = users;
  }

  registerUser(createUserDto: CreateUserDto): boolean {
    //! Para esto usé unos cuantos métodos que devolvían promesas(Promises<T>), supuestamente es algo que tiene que ver 
    //! con programación asíncrona, probablemente tengamos que refactorizar esto luego cuando veamos la teoría 
    if (this.checkExistingPassword(createUserDto.password)) {
      return false;
    }

    let newUser = new User();
    newUser.name = createUserDto.name;
    newUser.email = createUserDto.email;
    newUser.phone = createUserDto.phone;
    newUser.password = createUserDto.password;
    this.users.save(newUser);
    return true;
  }

  checkExistingPassword(password: string): boolean {
    let promise: Promise<User> = this.users.findOneBy({password});

    if (promise === null) {
      return true;
    } else {
      return false;
    }
  }
}