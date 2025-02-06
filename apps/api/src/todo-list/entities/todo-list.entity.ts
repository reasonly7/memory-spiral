import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'todo_list', comment: '存储待办事项' })
export class TodoListEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title', comment: '标题', nullable: false, type: 'text' })
  title: string;

  @CreateDateColumn({ name: 'created_at', comment: '创建时间' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', comment: '更新时间' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', comment: '删除时间' })
  deletedAt: Date;
}
