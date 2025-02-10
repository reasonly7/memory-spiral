import { Injectable } from '@nestjs/common';
import { MemorySpiralEntity } from './entities/memory-spiral.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMemorySpiralDto } from './dto/create-memory-spiral.dto';

@Injectable()
export class MemorySpiralService {
  constructor(
    @InjectRepository(MemorySpiralEntity)
    private readonly memorySpiralRepository: Repository<MemorySpiralEntity>,
  ) {}

  findAll(): Promise<MemorySpiralEntity[]> {
    return this.memorySpiralRepository.find({
      where: { deletedAt: null },
      order: { createdAt: 'ASC' },
    });
  }

  addOne(createTodolistDto: CreateMemorySpiralDto) {
    const newRecord = this.memorySpiralRepository.create(createTodolistDto);
    return this.memorySpiralRepository.save(newRecord);
  }

  async deleteById(id: string) {
    const res = await this.memorySpiralRepository.softDelete(id);
    return res.affected === 1;
  }
}
