import { IsNotEmpty, IsArray, IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCvDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  firstname: string;

  @IsInt()
  @Min(0)
  @Type(() => Number)
  age: number;

  @IsNotEmpty()
  cin: string;

  @IsNotEmpty()
  job: string;

  @IsOptional()
  path?: string;
  // hadha numeric id of the user who owns the CV
  @IsInt()
  @Type(() => Number)
  userId: number;

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  skillsIds?: number[];
}