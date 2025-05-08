import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './todo.model';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a todo', () => {
    const todo: CreateTodoDto = { body: 'Test Todo', title: 'Test Title' };
    const createdTodo = service.create(todo);
    expect(createdTodo).toBeDefined();
    expect(createdTodo.body).toBe(todo.body);
  });

  it('should find all todos', () => {
    const todos = service.findAll();
    expect(todos).toHaveLength(service.todos.length);
  });

  it('should find a todo by id', () => {
    const todo = service.findOne('1');
    expect(todo).toBeDefined();
    expect(todo.id).toBe('1');
  });

  it('should update a todo', () => {
    const updateData = { title: 'Updated Title' };
    const updatedTodo = service.update('1', updateData);
    expect(updatedTodo).toBeDefined();
    expect(updatedTodo.title).toBe('Updated Title');
  })

  it('should delete a todo', () => {
    const deletedTodo = service.delete('1');
    expect(deletedTodo).toBeDefined();
    expect(service.todos).not.toContainEqual(deletedTodo);
  });

  it('should throw an error when todo not found', () => {
    expect(() => service.findOne('999')).toThrow("Error finding todo: Todo with id 999 not found");
  });
});
