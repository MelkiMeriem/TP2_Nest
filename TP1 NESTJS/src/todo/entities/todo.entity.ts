import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { StatusEnum } from '../status.enum';
import { BaseEntityWithDates } from './base.entitie';

@Entity('todos')
export class TodoEntity extends BaseEntityWithDates {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.PENDING,
  })
  status: StatusEnum;

  @Column()
  userId: number;
}
