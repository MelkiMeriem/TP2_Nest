import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ERROR_MESSAGES } from '../../common/error-messages';

export class CreateTodoDto {
  @IsString({ message: ERROR_MESSAGES.NAME_REQUIRED })
  @IsNotEmpty({ message: ERROR_MESSAGES.NAME_REQUIRED })
  @MinLength(3, { message: ERROR_MESSAGES.NAME_TOO_SHORT })
  @MaxLength(10, { message: ERROR_MESSAGES.NAME_TOO_LONG })
  name: string;

  @IsString({ message: ERROR_MESSAGES.DESCRIPTION_REQUIRED })
  @IsNotEmpty({ message: ERROR_MESSAGES.DESCRIPTION_REQUIRED })
  @MinLength(10, { message: ERROR_MESSAGES.DESCRIPTION_TOO_SHORT })
  description: string;
}
