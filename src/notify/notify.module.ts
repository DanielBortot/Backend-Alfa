import { Module } from '@nestjs/common';
import { NotifyController } from './notify.controller';
import { NotifyService } from './notify.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { notificacion } from './notify.entity';

@Module({
  imports: [TypeOrmModule.forFeature([notificacion])],
  controllers: [NotifyController],
  providers: [NotifyService]
})
export class NotifyModule {}
