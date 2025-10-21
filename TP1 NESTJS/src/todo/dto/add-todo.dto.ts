import { IsNotEmpty, IsString, Length } from 'class-validator';

export class AddTodoDto {
  @IsNotEmpty({ message: 'Le nom est obligatoire.' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères.' })
  @Length(3, 10, { message: 'Le nom doit contenir entre 3 et 10 caractères.' })
  name: string;

  @IsNotEmpty({ message: 'La description est obligatoire.' })
  @IsString({ message: 'La description doit être une chaîne de caractères.' })
  @Length(10, 255, {
    message: 'La description doit contenir au moins 10 caractères.',
  })
  description: string;
}
