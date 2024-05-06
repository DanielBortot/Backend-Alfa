/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

export class ChangePasswordDto{
    @IsString()
    newPassword: string;

    @IsString()
    email: string;
}