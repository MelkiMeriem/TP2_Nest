import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UserService } from '../user/user.service';
import { CvService } from '../cv/cv.service';
import { SkillService } from '../skill/skill.service';
import { genSkills, genUsers, genCv } from './seeder.utils';
import { cfg } from './seeder.config';
import { User } from '../user/entities/user.entity';
import { Skill } from '../skill/entities/skill.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userService = app.get(UserService);
  const cvService = app.get(CvService);
  const skillService = app.get(SkillService);

  const skillsData: Skill[] = genSkills();
  const skills: Skill[] = [];
  for (const skill of skillsData) skills.push(await skillService.create(skill));

  const usersData = genUsers();
  const users: User[] = [];
  for (const userData of usersData) users.push(await userService.create(userData));

  for (const user of users) {
    for (let i = 0; i < cfg.cvsPerUser; i++) {
      const cvData = genCv(user, skills);
      const skillsIds = (cvData.skills ?? []).map(s => s.id);
      await cvService.create({ ...cvData, userId: user.id, skillsIds });
    }
  }

  await app.close();
}

bootstrap();
