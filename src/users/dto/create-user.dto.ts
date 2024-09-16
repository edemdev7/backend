import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsDefined({
    message: 'Email is required',
  })
  @IsNotEmpty()
  email: string;

  @IsDefined({ message: 'Password is required' })
  @IsNotEmpty()
  password: string;

  @IsDefined({
    message: 'Password confirmation is required',
  })
  @IsNotEmpty()
  passwordConfirm: string;
}
