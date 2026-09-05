import { IsString, IsOptional, MinLength } from 'class-validator';

export class FromTemplateDto {
  @IsString()
  templateKey: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  title?: string;
}