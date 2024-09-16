import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class signUpDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a valid email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;
}
