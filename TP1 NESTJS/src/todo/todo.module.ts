import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { TodosService } from './todo.service';
import { TodosController } from './todo.controller';
import { AuthMiddleware } from '../auth/auth/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(TodosController); // Applique le middleware à toutes les routes du contrôleur Todo
  }
}
