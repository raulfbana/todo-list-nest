import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todo.controller';
import { TodoService } from './todo.service';
import { CreateTodoDto, TodoModel } from './todo.model';

describe('TodosController', () => {
  let controller: TodosController;
  let todoService: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodoService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(), // Certifique-se de que o método delete está incluído aqui
          },
        },
      ],
    }).compile();
  
    controller = module.get<TodosController>(TodosController);
    todoService = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call findAll method of TodoService', () => {
    const result: TodoModel[] = [{ id: '1', title: 'Test Todo', body: 'Test Body', status: 'todo' }];
    jest.spyOn(todoService, 'findAll').mockReturnValue(result);

    expect(controller.getAll()).toEqual(result);
    expect(todoService.findAll).toHaveBeenCalled();
  });

  it('should call findOne method of TodoService', () => {
    const result: TodoModel = { id: '1', title: 'Test Todo', body: 'Test Body', status: 'todo' };
    jest.spyOn(todoService, 'findOne').mockReturnValue(result);

    expect(controller.getTodoById('1')).toEqual(result);
    expect(todoService.findOne).toHaveBeenCalledWith('1');
  });

  it('should call create method of TodoService', () => {
    const todo: CreateTodoDto = { title: 'Test Todo', body: 'Test Body' };
    jest.spyOn(todoService, 'create').mockReturnValue({...todo, id: '1', status: 'todo' });

    expect(controller.createTodo(todo)).toEqual({...todo, id: '1', status: 'todo' });
    expect(todoService.create).toHaveBeenCalledWith(todo);
  });

  it('should call update method of TodoService', () => {
    const updateData = { title: 'Updated Title' };
    const result: TodoModel = { id: '1', title: 'Updated Title', body: 'Test Body', status: 'todo' };
    jest.spyOn(todoService, 'update').mockReturnValue(result);

    expect(controller.updateTodo('1', updateData)).toEqual(result);
    expect(todoService.update).toHaveBeenCalledWith('1', updateData);
  });

  it('should call delete method of TodoService', () => {
    const list: TodoModel[] = [
        { id: '1', title: 'Test Todo', body: 'Test Body', status: 'todo' },
        { id: '2', title: 'Test Todo 2', body: 'Test Body 2', status: 'doing' },
    ];
    const deletedTodo = list[0];
    jest.spyOn(todoService, 'delete').mockReturnValue([deletedTodo]);

    expect(controller.deleteTodo('1')).toEqual([deletedTodo]);
    expect(todoService.delete).toHaveBeenCalledWith('1');
});
});
