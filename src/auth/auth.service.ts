/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto} from './dto';
import { IDatabaseConnection } from './interfaces/auth.IUserRegister';
import { PgUserHandler } from './implementations/auth.pgUserRegister';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from './entities/user.entity';
import { loggedUser } from './types/loggedUser.type';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  private readonly users: Repository<User>;
  private readonly jwtService: JwtService;

  constructor(@InjectRepository(User) users: Repository<User>, jwtService: JwtService) {
    this.users = users;
    this.jwtService = jwtService;
  }

  async registerUser(createAuthDto: CreateUserDto): Promise<loggedUser> {
    let register: IDatabaseConnection = new PgUserHandler(this.users, this.jwtService);
    //TODO: Verificar Email y fuerza de contraseña antes de registrar al usuario (Posible clase ValidarContraseña)
    return register.registerUser(createAuthDto);
  }

  async loginUser(loginAuthDto: LoginUserDto): Promise<loggedUser> {
    let login: IDatabaseConnection = new PgUserHandler(this.users, this.jwtService);

    return login.loginUser(loginAuthDto);
  }
}
