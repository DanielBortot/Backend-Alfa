import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';


import { UserFF } from './entities/userFF.entity';
import { Followers } from './entities/followers.entity';


@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([ UserFF, Followers ]),
  ],
})
export class UserModule {}
