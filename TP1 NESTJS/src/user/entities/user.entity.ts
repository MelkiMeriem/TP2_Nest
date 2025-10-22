import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cv } from '../../cv/entities/cv.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn() 
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Cv, (cv) => cv.user, { cascade: false })
  cvs: Cv[];
}
