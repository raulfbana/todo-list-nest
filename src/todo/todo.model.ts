export type TodoStatus = 'todo' | 'doing' | 'done';

export class TodoModel {
    id: string;
    title: string;
    body: string;
    status: TodoStatus;
}

export class CreateTodoDto {
    title: string;
    body: string;
    status?: TodoStatus;
}

export class UpdateTodoDto {
    title?: string;
    body?: string;
    status?: TodoStatus;
}