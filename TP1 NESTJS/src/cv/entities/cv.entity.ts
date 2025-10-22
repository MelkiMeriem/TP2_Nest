import { Entity,PrimaryGeneratedColumn, Column , ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Skill } from "../../skill/entities/skill.entity";

@Entity('cv') 
export class Cv {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  firstname: string;
  @Column('int')
  age: number;
  @Column()
  cin: string;
  @Column()
  job: string;
  @Column({ nullable: true })
  path?: string;
  @ManyToOne(() => User, (user) => user.cvs, { onDelete: 'CASCADE' })
  user: User;
  @ManyToMany(() => Skill, (skill) => skill.cvs, { cascade: false })
  @JoinTable({
    name: 'cv_skills',
    joinColumn: { name: 'cv_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'skill_id', referencedColumnName: 'id' },
  })
  skills: Skill[];
}