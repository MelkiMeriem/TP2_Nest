import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { StatusEnum } from './status.enum';
import { AddTodoDto } from './dto/add-todo.dto';
import { ERROR_MESSAGES } from '../common/error-messages';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todosRepository: Repository<TodoEntity>,
  ) {}

  // 🔹 Créer un todo avec userId automatique
  async create(createTodoDto: CreateTodoDto, userId: number): Promise<TodoEntity> {
    const todo = this.todosRepository.create({
      ...createTodoDto,
      status: StatusEnum.PENDING,
      userId,
    });
    return this.todosRepository.save(todo);
  }

  // 🔹 Ajouter un todo avec AddTodoDto et userId automatique
  async addTodo(addTodoDto: AddTodoDto, userId: number): Promise<TodoEntity> {
    const todo = this.todosRepository.create({
      ...addTodoDto,
      userId,
    });
    return this.todosRepository.save(todo);
  }

  // 🔹 Récupérer tous les todos de l'utilisateur connecté avec filtres optionnels et pagination
  async findAll(
    userId: number,
    search?: string,
    status?: StatusEnum,
    page = 1,
    limit = 10,
  ): Promise<TodoEntity[]> {
    const query = this.todosRepository.createQueryBuilder('todo')
      .where('todo.userId = :userId', { userId });

    if (search) {
      query.andWhere(
        '(todo.name LIKE :search OR todo.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (status) {
      query.andWhere('todo.status = :status', { status });
    }

    query.skip((page - 1) * limit);
    query.take(limit);

    return query.getMany();
  }

  // 🔹 Récupérer un todo par id (vérification de propriété)
  async findOne(id: number, userId: number): Promise<TodoEntity> {
    const todo = await this.todosRepository.findOne({ 
      where: { id, userId } 
    });
    
    if (!todo) {
      throw new NotFoundException(ERROR_MESSAGES.TODO_NOT_FOUND);
    }
    
    return todo;
  }

  // 🔹 Mettre à jour un todo (vérification de propriété)
  async update(id: number, updateTodoDto: UpdateTodoDto, userId: number): Promise<TodoEntity> {
    const todo = await this.findOne(id, userId);
    Object.assign(todo, updateTodoDto);
    return this.todosRepository.save(todo);
  }

  // 🔹 Supprimer un todo définitivement (vérification de propriété)
  async deleteTodo(id: number, userId: number): Promise<void> {
    const todo = await this.findOne(id, userId);
    await this.todosRepository.remove(todo);
  }

  // 🔹 Soft delete (vérification de propriété)
  async softDeleteTodo(id: number, userId: number): Promise<void> {
    const todo = await this.findOne(id, userId);
    await this.todosRepository.softRemove(todo);
  }

  // 🔹 Restaurer un todo (vérification de propriété)
  async restoreTodo(id: number, userId: number): Promise<TodoEntity> {
    const todo = await this.todosRepository.findOne({
      where: { id, userId },
      withDeleted: true,
    });

    if (!todo) {
      throw new NotFoundException(ERROR_MESSAGES.TODO_NOT_FOUND);
    }

    if (!todo.deletedAt) return todo;

    await this.todosRepository.recover(todo);
    return todo;
  }

  // 🔹 Compter les todos par statut pour l'utilisateur connecté
  async countByStatus(userId: number): Promise<Record<StatusEnum, number>> {
    const counts: { status: StatusEnum; count: string }[] =
      await this.todosRepository
        .createQueryBuilder('todo')
        .select('todo.status', 'status')
        .addSelect('COUNT(todo.id)', 'count')
        .where('todo.userId = :userId', { userId })
        .groupBy('todo.status')
        .getRawMany();

    const result: Record<StatusEnum, number> = {
      [StatusEnum.PENDING]: 0,
      [StatusEnum.IN_PROGRESS]: 0,
      [StatusEnum.DONE]: 0,
    };

    counts.forEach((item) => {
      result[item.status] = parseInt(item.count, 10);
    });

    return result;
  }
}
