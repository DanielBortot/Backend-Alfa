/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

/* eslint-disable prettier/prettier */
export class ValidateCodeDto{
    @IsString()
    veriCode: string;
}