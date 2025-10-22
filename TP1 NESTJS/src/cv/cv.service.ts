import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cv } from './entities/cv.entity';
import { BaseService } from '../common/base.service';
import { UserService } from '../user/user.service';
import { SkillService } from '../skill/skill.service';

@Injectable()
export class CvService extends BaseService<Cv> {
  constructor(
    @InjectRepository(Cv) repo: Repository<Cv>, 
    private readonly userService: UserService,
    private readonly skillService: SkillService,
  ) {
    super(repo);
  }

  /**
   * Create a CV and associate it with an existing user and optional skills.
   */
  async create(dto: any): Promise<Cv> {
    const { userId, skillsIds = [], ...rest } = dto;

    // validate user
    const user = await this.userService.findOne(userId).catch(() => null);
    if (!user) throw new NotFoundException(`User ${userId} not found`);

    // create a fresh Cv instance and assign properties (avoids TS union Cv | Cv[])
    const cv = this.repo.create() as Cv;
    Object.assign(cv, rest);

    cv.user = user;

    if (Array.isArray(skillsIds) && skillsIds.length) {
      // prefer DB fetch by ids if available
      if (typeof (this.skillService as any).findByIds === 'function') {
        cv.skills = await (this.skillService as any).findByIds(skillsIds);
      } else {
        const all = await this.skillService.findAll();
        cv.skills = all.filter((s: any) => skillsIds.includes(s.id));
      }
    } else {
      cv.skills = [];
    }

    return this.repo.save(cv);
  }

  /**
   * Update a CV. If userId or skillsIds are provided, re-associate them.
   */
  async update(id: number | string, dto: any): Promise<Cv> {
    const parsedId = +id || id;
    const cv = await this.findOne(parsedId, ['user', 'skills']);

    const { userId, skillsIds, ...rest } = dto;

    // assign primitive fields from rest
    Object.assign(cv, rest);

    if (userId !== undefined && userId !== null) {
      const user = await this.userService.findOne(userId);
      cv.user = user;
    }

    if (skillsIds !== undefined) {
      if (Array.isArray(skillsIds) && skillsIds.length) {
        if (typeof (this.skillService as any).findByIds === 'function') {
          cv.skills = await (this.skillService as any).findByIds(skillsIds);
        } else {
          const all = await this.skillService.findAll();
          cv.skills = skillsIds.map((sid: number) => all.find((s: any) => s.id === sid)).filter(Boolean) as any;
        }
      } else {
        // empty array = clear skills
        cv.skills = [];
      }
    }

    return this.repo.save(cv);
  }
}
