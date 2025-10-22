import { Entity, PrimaryGeneratedColumn, Column , ManyToMany } from "typeorm";
import { Cv } from "../../cv/entities/cv.entity";
@Entity('skills')
export class Skill {
    @PrimaryGeneratedColumn('uuid')
    id:number;

    @Column({ unique: true })
    designation:string;

    @ManyToMany(() => Cv , (cv) => cv.skills )
    cvs:Cv[];
    }