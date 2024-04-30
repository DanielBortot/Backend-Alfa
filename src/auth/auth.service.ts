import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateAuthDto } from './dto';
import { IDatabaseConnection } from './interfaces/auth.IUserRegister';
import { PgUserHandler } from './implementations/auth.pgUserRegister';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from './entities/user.entity';
@Injectable()
export class AuthService {
  private readonly users: Repository<User>;

  constructor(@InjectRepository(User) users: Repository<User>) {
    this.users = users;
  }

  registerUser(createAuthDto: CreateUserDto): boolean {
    let register: IDatabaseConnection = new PgUserHandler(this.users);
    //TODO: Verificar Email y fuerza de contraseña antes de registrar al usuario (Posible clase ValidarContraseña)
    return register.registerUser(createAuthDto);
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
