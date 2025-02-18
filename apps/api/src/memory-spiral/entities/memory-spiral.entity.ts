import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'datasource', comment: '存储记忆数据' })
export class MemorySpiralEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', comment: '名称', nullable: false, type: 'tinytext' })
  name: string;

  @Column({ name: 'content', comment: '描述', nullable: false, type: 'text' })
  content: string;

  @Column({
    name: 'count',
    comment: '关键词计数',
    nullable: false,
    type: 'int',
  })
  count: number;

  @CreateDateColumn({ name: 'created_at', comment: '创建时间' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', comment: '更新时间' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', comment: '删除时间' })
  deletedAt: Date;
}
