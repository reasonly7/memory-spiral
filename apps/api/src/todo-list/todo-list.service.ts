import { Injectable } from '@nestjs/common';
import { TodoListEntity } from './entities/todo-list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoListDto } from './dto/create-todo-list.dto';

@Injectable()
export class TodoListService {
  constructor(
    @InjectRepository(TodoListEntity)
    private readonly todoListRepository: Repository<TodoListEntity>,
  ) {}

  findAll(): Promise<TodoListEntity[]> {
    return this.todoListRepository.find({
      where: { deletedAt: null },
      order: { createdAt: 'ASC' },
    });
  }

  addOne(createTodolistDto: CreateTodoListDto) {
    const newRecord = this.todoListRepository.create(createTodolistDto);
    return this.todoListRepository.save(newRecord);
  }

  async deleteById(id: string) {
    const res = await this.todoListRepository.softDelete(id);
    return res.affected === 1;
  }
}
