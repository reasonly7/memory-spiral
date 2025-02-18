import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMemorySpiralDto {
  @IsString()
  @IsNotEmpty({ message: 'name 必填' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'content 必填' })
  content: string;

  @IsNumber()
  @IsNotEmpty({ message: '关键词数量必填' })
  count: number;
}
