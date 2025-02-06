import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoListDto {
  @IsString()
  @IsNotEmpty({ message: 'name 必填' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'content 必填' })
  content: string;
}
