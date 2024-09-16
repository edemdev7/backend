import { IsArray } from 'class-validator';

export class UpdateUserServiceWidgetDto {
  @IsArray()
  widgets: string[];
}
