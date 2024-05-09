import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';


import { User } from './entities/user.entity';
import { Followers } from './entities/followers.entity';


@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([ User, Followers ]),
  ],
})
export class UserModule {}
