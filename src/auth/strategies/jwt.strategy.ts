/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWTPayload } from '../types/JWTPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow('JWT'),
        });
    }

    async validate(payload: JWTPayload) {
        return { email: payload.email, name: payload.name };
    }
}