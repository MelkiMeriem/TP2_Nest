import { Skill } from '../skill/entities/skill.entity';
import { User } from '../user/entities/user.entity';
import { Cv } from '../cv/entities/cv.entity';
import { randFirstName, randLastName, randEmail, randJobTitle, randNumber, randWord, randPassword } from '@ngneat/falso';
import { cfg } from './seeder.config';

const uniqueGenerate = (fn: () => string, count: number): string[] => {
  const set = new Set<string>();
  while (set.size < count) set.add(fn());
  return Array.from(set);
};


export const genSkills = (): Skill[] =>
  uniqueGenerate(() => randWord(), cfg.skills).map(designation => ({ designation } as Skill));


export const genUsers = (): Partial<User>[] => {
  const usernames = uniqueGenerate(() => randFirstName().toLowerCase(), cfg.users);
  const emails = uniqueGenerate(() => randEmail(), cfg.users);
  return Array.from({ length: cfg.users }, (_, i) => ({
    username: usernames[i],
    email: emails[i],
    password: randPassword({ length: 10, memorable: true }).join(''),
  }));
};


export const pickSkills = (allSkills: Skill[]): Skill[] => {
  const shuffled = [...allSkills].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, cfg.skillsPerCv);
};


export const genCv = (user: User, allSkills: Skill[]): Partial<Cv> => ({
  name: randLastName(),
  firstname: randFirstName(),
  age: randNumber({ min: 20, max: 60 }),
  cin: randNumber({ min: 10000000, max: 99999999 }).toString(),
  job: randJobTitle(),
  path: `uploads/${user.username}_${Date.now()}.pdf`,
  skills: pickSkills(allSkills),
});
