import { Module } from '@nestjs/common';
import { TodoListController } from './todo-list.controller';
import { TodoListService } from './todo-list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoListEntity } from './entities/todo-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoListEntity])],
  controllers: [TodoListController],
  providers: [TodoListService],
})
export class TodoListModule {}
