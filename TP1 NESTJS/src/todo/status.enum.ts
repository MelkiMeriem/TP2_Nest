import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from '../todo/dto/create-todo.dto';
import {
  IsEnum,
  IsOptional,
  MinLength,
  MaxLength,
  IsString,
} from 'class-validator';
import { ERROR_MESSAGES } from '../common/error-messages';
export enum StatusEnum {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}
export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsOptional()
  @IsEnum(StatusEnum, { message: ERROR_MESSAGES.STATUS_INVALID })
  status?: StatusEnum;

  @IsOptional()
  @IsString({ message: ERROR_MESSAGES.NAME_REQUIRED })
  @MinLength(3, { message: ERROR_MESSAGES.NAME_TOO_SHORT })
  @MaxLength(10, { message: ERROR_MESSAGES.NAME_TOO_LONG })
  name?: string;

  @IsOptional()
  @IsString({ message: ERROR_MESSAGES.DESCRIPTION_REQUIRED })
  @MinLength(10, { message: ERROR_MESSAGES.DESCRIPTION_TOO_SHORT })
  description?: string;
}
