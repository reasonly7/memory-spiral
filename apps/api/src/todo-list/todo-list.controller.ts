import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { CreateTodoListDto } from './dto/create-todo-list.dto';

@Controller('todo-list')
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) {}

  @Get()
  findAll() {
    return this.todoListService.findAll();
  }

  @Post()
  addOne(@Body() createTodolistDto: CreateTodoListDto) {
    return this.todoListService.addOne(createTodolistDto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.todoListService.deleteById(id);
  }
}
