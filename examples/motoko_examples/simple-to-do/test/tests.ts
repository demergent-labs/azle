import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test/jest';

import { ToDo } from '../src';
// @ts-ignore
import { _SERVICE } from './dfx_generated/simple_to_do/simple_to_do.did';

const FIRST_TODO_DESCRIPTION = 'Write tests for the simple to do list example';
const SECOND_TODO_DESCRIPTION = 'Mark this todo as complete';

export function getTests(todoCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('adds a todo', async () => {
            const result = await todoCanister.addTodo(FIRST_TODO_DESCRIPTION);
            const expectedResult: ToDo[] = [
                {
                    description: FIRST_TODO_DESCRIPTION,
                    completed: false
                }
            ];
            const todos = await todoCanister.getTodos();

            expect(result).toBe(0n);
            expect(todos).toStrictEqual(expectedResult);
        });

        it('adds a second todo', async () => {
            const result = await todoCanister.addTodo(SECOND_TODO_DESCRIPTION);
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

            expect(result).toBe(1n);
            expect(todos).toStrictEqual(expectedResult);
        });

        it('shows todos', async () => {
            const expectedResult: string = `\n___TO-DOs___\n${FIRST_TODO_DESCRIPTION}\n${SECOND_TODO_DESCRIPTION}`;
            const todos = await todoCanister.showTodos();

            expect(todos).toBe(expectedResult);
        });

        it('completes a todo', async () => {
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

            expect(result).toBe(undefined);
            expect(todos).toStrictEqual(expectedResult);
        });

        it('shows completed todos', async () => {
            const expectedResult: string = `\n___TO-DOs___\n${FIRST_TODO_DESCRIPTION}\n${SECOND_TODO_DESCRIPTION} ✔`;
            const todos = await todoCanister.showTodos();

            expect(todos).toBe(expectedResult);
        });

        it('clears completed todos', async () => {
            const result = await todoCanister.clearCompleted();
            const expectedResult: ToDo[] = [
                {
                    description: FIRST_TODO_DESCRIPTION,
                    completed: false
                }
            ];
            const todos = await todoCanister.getTodos();

            expect(result).toBe(undefined);
            expect(todos).toStrictEqual(expectedResult);
        });

        it('completes a second todo', async () => {
            const result = await todoCanister.completeTodo(0n);
            const expectedResult: ToDo[] = [
                {
                    description: FIRST_TODO_DESCRIPTION,
                    completed: true
                }
            ];
            const todos = await todoCanister.getTodos();

            expect(result).toBe(undefined);
            expect(todos).toStrictEqual(expectedResult);
        });

        it('clears completed todos', async () => {
            const result = await todoCanister.clearCompleted();
            const todos = await todoCanister.getTodos();

            expect(result).toBe(undefined);
            expect(todos).toHaveLength(0);
        });
    };
}
