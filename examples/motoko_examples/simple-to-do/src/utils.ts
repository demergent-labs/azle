import { ToDo } from './types';
import { nat } from 'azle';

// Add to-do item utility
export function add(todos: ToDo[], desc: string, nextId: nat): ToDo[] {
  let todo: ToDo = {
    id: nextId,
    description: desc,
    completed: false,
  };
  return todos.concat(todo);
}

// Complete to-do item utility
export function complete(todos: ToDo[], id: nat): ToDo[] {
  return todos.map((todo) => {
    if (todo.id == id) {
      return {
        ...todo,
        completed: true,
      };
    }
    return todo;
  });
}

// Show to-do item utility
export function show(todos: ToDo[]): string {
  let output = '\n___TO-DOs___';
  for (let todo of todos) {
    output += `\n(${todo.id}) ${todo.description}`;
    if (todo.completed) {
      output += ' ✔';
    }
  }
  return output;
}

// Clear to-do item utility
export function clear(todos: ToDo[]): ToDo[] {
  let updated = [];
  for (let todo of todos) {
    if (!todo.completed) {
      updated.push(todo);
    }
  }
  return updated;
}
