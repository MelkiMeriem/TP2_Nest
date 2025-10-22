import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';
import { BaseService } from '../common/base.service';
@Injectable()
export class SkillService extends BaseService<Skill> {
  constructor(@InjectRepository(Skill) repo: Repository<Skill>) {
    super(repo);
  }
}