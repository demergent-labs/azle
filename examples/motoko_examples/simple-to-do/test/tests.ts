import { Test } from 'azle/test';
import { ToDo } from '../src';
import { _SERVICE } from './dfx_generated/simple_to_do/simple_to_do.did';
import { ActorSubclass } from '@dfinity/agent';

const FIRST_TODO_DESCRIPTION = 'Write tests for the simple to do list example';
const SECOND_TODO_DESCRIPTION = 'Mark this todo as complete';

export function getTests(todoCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'add todo',
            test: async () => {
                const result = await todoCanister.addTodo(
                    FIRST_TODO_DESCRIPTION
                );
                const expectedResult: ToDo[] = [
                    {
                        description: FIRST_TODO_DESCRIPTION,
                        completed: false
                    }
                ];
                const todos = await todoCanister.getTodos();

                return {
                    Ok: result === 0n && equalTodoList(todos, expectedResult)
                };
            }
        },
        {
            name: 'add second todo',
            test: async () => {
                const result = await todoCanister.addTodo(
                    SECOND_TODO_DESCRIPTION
                );
                const expectedResult: ToDo[] = [
                    {
                        description: FIRST_TODO_DESCRIPTION,
                        completed: false
                    },
                    {
                        description: SECOND_TODO_DESCRIPTION,
                        completed: false
                    }
                ];
                const todos = await todoCanister.getTodos();

                return {
                    Ok: result === 1n && equalTodoList(todos, expectedResult)
                };
            }
        },
        {
            name: 'show todos',
            test: async () => {
                const expectedResult: string = `\n___TO-DOs___\n${FIRST_TODO_DESCRIPTION}\n${SECOND_TODO_DESCRIPTION}`;
                const todos = await todoCanister.showTodos();
                return {
                    Ok: todos === expectedResult
                };
            }
        },
        {
            name: 'complete todo',
            test: async () => {
                const result = await todoCanister.completeTodo(1n);
                const expectedResult: ToDo[] = [
                    {
                        description: FIRST_TODO_DESCRIPTION,
                        completed: false
                    },
                    {
                        description: SECOND_TODO_DESCRIPTION,
                        completed: true
                    }
                ];
                const todos = await todoCanister.getTodos();

                return {
                    Ok:
                        result === undefined &&
                        equalTodoList(todos, expectedResult)
                };
            }
        },
        {
            name: 'show completed todos',
            test: async () => {
                const expectedResult: string = `\n___TO-DOs___\n${FIRST_TODO_DESCRIPTION}\n${SECOND_TODO_DESCRIPTION} ✔`;
                const todos = await todoCanister.showTodos();
                return {
                    Ok: todos === expectedResult
                };
            }
        },
        {
            name: 'clear completed todos',
            test: async () => {
                const result = await todoCanister.clearCompleted();
                const expectedResult: ToDo[] = [
                    {
                        description: FIRST_TODO_DESCRIPTION,
                        completed: false
                    }
                ];
                const todos = await todoCanister.getTodos();

                return {
                    Ok:
                        result === undefined &&
                        equalTodoList(todos, expectedResult)
                };
            }
        },
        {
            name: 'complete todo',
            test: async () => {
                const result = await todoCanister.completeTodo(0n);
                const expectedResult: ToDo[] = [
                    {
                        description: FIRST_TODO_DESCRIPTION,
                        completed: true
                    }
                ];
                const todos = await todoCanister.getTodos();

                return {
                    Ok:
                        result === undefined &&
                        equalTodoList(todos, expectedResult)
                };
            }
        },
        {
            name: 'clear completed todos',
            test: async () => {
                const result = await todoCanister.clearCompleted();
                const todos = await todoCanister.getTodos();

                return {
                    Ok: result === undefined && todos.length === 0
                };
            }
        }
    ];
}

function equalTodoList(listA: ToDo[], listB: ToDo[]): boolean {
    return (
        listA.length === listB.length &&
        listA.every((item, index) => equalTodo(item, listB[index]))
    );
}

function equalTodo(todoA: ToDo, todoB: ToDo): boolean {
    return (
        todoA.description === todoB.description &&
        todoA.completed === todoB.completed
    );
}
