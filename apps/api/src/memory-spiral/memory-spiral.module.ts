import { Module } from '@nestjs/common';
import { MemorySpiralController } from './memory-spiral.controller';
import { MemorySpiralService } from './memory-spiral.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemorySpiralEntity } from './entities/memory-spiral.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MemorySpiralEntity])],
  controllers: [MemorySpiralController],
  providers: [MemorySpiralService],
})
export class MemorySpiralModule {}
