import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  Put,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosService } from './todo.service';
import { TodoEntity } from './entities/todo.entity';
import { AddTodoDto } from './dto/add-todo.dto';
import { StatusEnum } from './status.enum';
import { AuthMiddleware } from '../auth/auth/auth.middleware';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Req() req: any) {
    return this.todosService.create(createTodoDto, req.userId);
  }

  @Post('add')
  addTodo(@Body() addTodoDto: AddTodoDto, @Req() req: any): Promise<TodoEntity> {
    return this.todosService.addTodo(addTodoDto, req.userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto, @Req() req: any) {
    return this.todosService.update(+id, updateTodoDto, req.userId);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string, @Req() req: any): Promise<{ message: string }> {
    await this.todosService.deleteTodo(+id, req.userId);
    return { message: `Todo avec l'id ${id} a été supprimé avec succès` };
  }

  @Delete(':id/soft')
  async softDelete(@Param('id') id: string, @Req() req: any): Promise<{ message: string }> {
    await this.todosService.softDeleteTodo(+id, req.userId);
    return { message: `Todo avec l'id ${id} a été supprimé (soft delete)` };
  }

  @Patch(':id/restore')
  async restore(@Param('id') id: string, @Req() req: any) {
    await this.todosService.restoreTodo(+id, req.userId);
    return { message: `Todo avec l'id ${id} a été restauré` };
  }

  // 🔹 GET /todos → tous les todos de l'utilisateur connecté, filtres optionnels
  @Get()
  async getAllTodos(
    @Query('search') search?: string,
    @Query('status') status?: StatusEnum,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Req() req?: any,
  ): Promise<TodoEntity[]> {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 10;
    return this.todosService.findAll(req.userId, search, status, pageNumber, limitNumber);
  }

  // 🔹 GET /todos/stats → stats par statut pour l'utilisateur connecté
  @Get('stats')
  async getStats(@Req() req: any) {
    return this.todosService.countByStatus(req.userId);
  }

  // 🔹 GET /todos/:id → un todo par id (vérification de propriété)
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: any) {
    return this.todosService.findOne(+id, req.userId);
  }
}
