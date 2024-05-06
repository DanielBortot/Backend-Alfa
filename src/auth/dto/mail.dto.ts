/* eslint-disable prettier/prettier */

import { IsString } from "class-validator";

/* eslint-disable prettier/prettier */
export class mailDto{

    @IsString()
    email : string;
}