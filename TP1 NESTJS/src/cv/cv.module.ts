import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { UserModule } from '../user/user.module';
import { SkillModule } from '../skill/skill.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cv]), UserModule, SkillModule],
  providers: [CvService],
  controllers: [CvController],
})
export class CvModule {}
