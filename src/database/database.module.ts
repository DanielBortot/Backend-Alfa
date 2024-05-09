import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configservice: ConfigService) => ({
                type: 'postgres',
                host: configservice.getOrThrow('DB_HOST'),
                port: configservice.getOrThrow('DB_PORT'),
                username: configservice.getOrThrow('DB_USERNAME'),
                password: configservice.getOrThrow('DB_PASSWORD'),
                database: configservice.getOrThrow('DB_NAME'),
                synchronize: true,
                autoLoadEntities: true,
            }),
        })
    ],
    exports: [TypeOrmModule]
})
export class DatabaseModule {}
