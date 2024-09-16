import { IsEmail, IsString, IsNotEmpty, MinLength, Min } from "class-validator";

export class loginDto{
    @IsNotEmpty()
    @IsEmail({}, {message: "Please enter correct email"})
    readonly email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    readonly password: string
}