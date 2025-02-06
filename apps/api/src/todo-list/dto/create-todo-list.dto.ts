import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoListDto {
  @IsString()
  @IsNotEmpty({ message: '你得输入点什么' })
  title: string;
}
