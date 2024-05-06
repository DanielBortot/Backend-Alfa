/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto';
import { IDatabaseConnection } from './interfaces/auth.IUserRegister';
import { PgUserHandler } from './implementations/auth.pgUserRegister';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from './entities/user.entity';
import { loggedUser } from './types/loggedUser.type';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { sendEmailDto } from './dto/sendEmail.dto';
import Mail from 'nodemailer/lib/mailer';
import { mailDto } from './dto/mail.dto';
import { ValidateCodeDto } from './dto/validateCode.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
@Injectable()
export class AuthService {
  private readonly users: Repository<User>;
  private readonly jwtService: JwtService;

  constructor(@InjectRepository(User) users: Repository<User>, jwtService: JwtService,private readonly configService: ConfigService) {
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

  mailTransport(){
    const transporter = nodemailer.createTransport({
        host: this.configService.get<string>('EMAIL_HOST'),
        port: this.configService.get<number>('EMAIL_PORT'),
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: this.configService.get<string>('EMAIL_USERNAME') ,
          pass: this.configService.get<string>('EMAIL_PASSWORD'),
        },
      }); 

    return transporter;
  }

  async sendEmail(dto: sendEmailDto, mailDto: mailDto, verificationCode : number){
    const {email} = mailDto;
    const found = await this.users.findOne({where: {email: email} });

    if(!found){
      throw new NotFoundException(`User with /${email}/ is not Found`);
    }else{

      //registra el codigo de verificacion al usuario en la bd
        found.verificationCode = verificationCode.toString();
        await this.users.save(found);

      //Envia el correo
      const{from, recipients, subject, html, placeholderReplacements} = dto;

      const transport = this.mailTransport();
      const options : Mail.Options={
        from: from ?? {
          name: this.configService.get<string>('APP_NAME') ,
         address: this.configService.get<string>('DEFAULT_MAIL_FROM'),
        },
        to:recipients,
        subject,
        html
      }
      try {
        const result = await transport.sendMail(options)
      } catch (error) {
        console.log('Error:', error);
      }
    }
}
//recibe el codigo que el usuario recibe por el correo y busca en la bd si hay algun user que tenga ese verificatioCode, de ser asi permite cambiar contraseña
async validateCode(validateCodeDto: ValidateCodeDto){
  const {veriCode} = validateCodeDto;
  const vericode = veriCode.toString()
  const found = await this.users.findOne({where: {verificationCode: vericode} });
    if(!found){
      throw new NotFoundException(`this verification Code /${veriCode}/ does not match with any user`);
    }else{
      console.log('El codigo de verificación es correcto...')
   }
  }

  //recibe la nueva contraseña y el email para guardar la nueva contraseña en la base de datos
  async changePassword(ChangePasswordDto: ChangePasswordDto){
    const {newPassword, email} = ChangePasswordDto;
    const found = await this.users.findOne({where: {email: email} });
    //ToDo: encryptar la nueva contrasña
    found.password = newPassword;
    await this.users.save(found);
  }
}




