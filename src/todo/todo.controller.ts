import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto, TodoModel, TodoStatus, UpdateTodoDto } from './todo.model';

@Controller('todos')
export class TodosController {

    constructor(private readonly todoService: TodoService) {}

    @Get()
    getAll(@Query('status') status?: TodoStatus) {
        try{
            return this.todoService.findAll(status);
        }catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Get(':id')
    getTodoById(@Param('id') id: string) {
        try {
            return this.todoService.findOne(id);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Post()
    createTodo(@Body() task: CreateTodoDto) {
        try {
            return this.todoService.create(task);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Put(':id')
    updateTodo(@Param('id') id: string, @Body() task: UpdateTodoDto) {
        try {
            return this.todoService.update(id, task);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Delete(':id')
    deleteTodo(@Param('id') id: string) {
        try {
            return this.todoService.delete(id);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }


}
