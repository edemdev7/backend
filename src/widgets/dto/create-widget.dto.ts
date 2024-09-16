import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateWidgetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsMongoId()
  @IsNotEmpty()
  service: string; // L'ID du service auquel le widget est lié
}
