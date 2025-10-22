import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { TrialModule } from './trial/trial.module';
import { TodoModule } from './todo/todo.module';
import { TodoEntity } from './todo/entities/todo.entity';
import { UserModule } from './user/user.module';
import { CvModule } from './cv/cv.module';
import { SkillModule } from './skill/skill.module';

@Module({
  imports: [
    CommonModule,
    TodoModule,
    TrialModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'nestuser', // <-- nouvel utilisateur MySQL
      password: 'N3stU$er!2025', // <-- mot de passe de l'utilisateur
      database: 'nest_project', // <-- nom de la base
      entities: [TodoEntity],
      autoLoadEntities: true, // charge automatiquement toutes les entités
      synchronize: true, // recrée les tables à chaque démarrage (dev only)
    }),
    UserModule,
    CvModule,
    SkillModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
