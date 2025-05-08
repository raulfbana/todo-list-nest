import { Injectable } from '@nestjs/common';
import { CreateTodoDto, TodoModel, TodoStatus, UpdateTodoDto } from './todo.model';

@Injectable()
export class TodoService {
    todos: TodoModel[] = [
        {
            id: '1',
            title: 'Todo 1',
            body: 'This is the first todo',
            status: 'todo',
        },
        {
            id: '2',
            title: 'Todo 2',
            body: 'This is the second todo',
            status: 'doing',
        },
        {
            id: '3',
            title: 'Todo 3',
            body: 'This is the third todo',
            status: 'done',
        },
    ]

    validStatus: TodoStatus[] = ['todo', 'doing', 'done'];

    findAll(status?: TodoStatus): TodoModel[] {
        if (status) {
            const filteredTodos = this.todos.filter(todo => todo.status === status);
            if (filteredTodos.length === 0) {
                throw new Error(`No todos found with status ${status}`);
            }
            return filteredTodos;
        }
        return this.todos;
    }

    findOne(id: string): TodoModel {
        try{
            const todo = this.todos.find(todo => todo.id === id);
            if (!todo) {
                throw new Error(`Todo with id ${id} not found`);
            }
            return todo;}
        catch (error) {
            throw new Error(`Error finding todo: ${error.message}`);
        }
    }

    create(todo: CreateTodoDto): TodoModel {
        try{
            const newTodo: TodoModel = {
                id: (this.todos.length + 1).toString(),
                status: todo.status || 'todo',
                ...todo,
            };
            this.todos.push(newTodo);
            return newTodo;
        } catch (error) {
            throw new Error(`Error creating todo: ${error.message}`);
        }
    }

    update(id: string, updatedTodo: UpdateTodoDto): TodoModel {
        try {
            const todoIndex = this.todos.findIndex(todo => todo.id === id);
            if (todoIndex === -1) {
                throw new Error(`Todo with id ${id} not found`);
            }

            if (updatedTodo.status && !this.validStatus.includes(updatedTodo.status)) {
                throw new Error(`Invalid status: ${updatedTodo.status}`);
            }

            this.todos[todoIndex] = { ...this.todos[todoIndex], ...updatedTodo };
            return this.todos[todoIndex];
        } catch (error) {
            throw new Error(`Error updating todo: ${error.message}`);
        }
    }

    delete(id: string): TodoModel[] {
        try{
            const todoIndex = this.todos.findIndex(todo => todo.id === id);
            if (todoIndex === -1) {
                throw new Error(`Todo with id ${id} not found`);
            }
            this.todos.splice(todoIndex, 1);
            return this.todos;
        }catch (error) {
            throw new Error(`Error deleting todo: ${error.message}`);
        }
    }
}
