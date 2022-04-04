import {
  Query,
  Update,
  nat
} from 'azle';
import { ToDo } from './types';

import * as Utils from './utils';

let todos: ToDo[] = [];
let nextId: nat = 1n;

export function getTodos(): Query<ToDo[]> {
  return todos;
}

export function addTodo(description: string): Update<void> {
  todos = Utils.add(todos, description, nextId);
  nextId += 1n;
}

export function completeTodo(id: nat): Update<void> {
  todos = Utils.complete(todos, id);
}

export function showTodos(): Query<string> {
  return Utils.show(todos);
}

export function clearCompleted(): Update<void> {
  todos = Utils.clear(todos);
}
