import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MemorySpiralService } from './memory-spiral.service';
import { CreateMemorySpiralDto } from './dto/create-memory-spiral.dto';

@Controller('memory-spiral')
export class MemorySpiralController {
  constructor(private readonly memorySpiralService: MemorySpiralService) {}

  @Get()
  findAll() {
    return this.memorySpiralService.findAll();
  }

  @Post()
  addOne(@Body() createTodolistDto: CreateMemorySpiralDto) {
    return this.memorySpiralService.addOne(createTodolistDto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.memorySpiralService.deleteById(id);
  }
}
