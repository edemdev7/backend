import { IsArray, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateUserServiceWidgetDto {

  user: string;

  service: string;

  @IsArray()
  widgets: string[];
}
