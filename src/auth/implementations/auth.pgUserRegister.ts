/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Repository } from "typeorm";
import { CreateUserDto, LoginUserDto } from "../dto";
import { IDatabaseConnection as IUserHandler } from "../interfaces/auth.IUserRegister";
import { User } from "../entities/user.entity";
import { HttpException, HttpStatus } from "@nestjs/common";
import { loggedUser } from "../types/loggedUser.type";
import { JwtService } from "@nestjs/jwt";
import { IEncrypted } from "../interfaces/auth.IEncrypted";
import { BcryptEncrypted } from "./auth.bcryptEncrypted";

//! Se necesita hacer revision para dividir responsabilidades
export class PgUserHandler implements IUserHandler {
  private users: Repository<User>;
  private jwtService: JwtService;
  private hashPassword: IEncrypted;

  constructor(users: Repository<User>, jwtService: JwtService) {
    this.users = users;
    this.jwtService = jwtService;
    this.hashPassword = new BcryptEncrypted();
  }

  async registerUser(createUserDto: CreateUserDto): Promise<loggedUser> {
    //! Para esto usé unos cuantos métodos que devolvían promesas(Promises<T>), supuestamente es algo que tiene que ver 
    //! con programación asíncrona, probablemente tengamos que refactorizar esto luego cuando veamos la teoría 
    if ( await this.checkExistingEmail(createUserDto.email)) {
      throw new HttpException('El usuario ya existe', HttpStatus.BAD_REQUEST);
    }

    const hash = await this.hashPassword.getEncryptedPassword(createUserDto.password);

    let newUser = this.users.create({...createUserDto, password: hash});
    await this.users.save(newUser);

    const token = await this.getJWTToken(newUser.email, newUser.name);
    const {password, ...objUser} = newUser 

    return {...objUser, token};
  }
  
  async loginUser(loginUserDto: LoginUserDto): Promise<loggedUser> {

    let user: User = await this.checkExistingEmail(loginUserDto.email);

    if (!user) throw new HttpException('No existe el usuario', HttpStatus.BAD_REQUEST);
    if (! await this.hashPassword.checkPassword(user.password, loginUserDto.password)) throw new HttpException('La contraseña no es correcta', HttpStatus.BAD_REQUEST);

    const token = await this.getJWTToken(user.email, user.name);
    const {password, ...objUser} = user 

    return {...objUser, token};
  }

  async checkExistingEmail(email: string): Promise<User | null> {
    let user: User = await this.users.findOneBy({email});

    if (user) return user;
    return null;
  }

  async getJWTToken(email: string, name: string): Promise<string> {
    return this.jwtService.sign({email, name})
  }
}