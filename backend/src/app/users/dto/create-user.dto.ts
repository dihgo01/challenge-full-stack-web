import { IsNotEmpty, IsEmail, IsOptional } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()    
    email: string;

    @IsNotEmpty()
    password: string;

    @IsOptional()
    type: string;
}
