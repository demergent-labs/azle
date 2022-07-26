import { deploy, run_tests, Test } from 'azle/test';
import { ToDo } from '../canisters/azle';
import { createActor } from '../dfx_generated/azle/';

const todo_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const FIRST_TODO_DESCRIPTION = 'Write tests for the simple to do list example';
const SECOND_TODO_DESCRIPTION = 'Mark this todo as complete';

const tests: Test[] = [
    ...deploy('azle'),
    {
        name: 'add todo',
        test: async () => {
            const result = await todo_canister.add_todo(FIRST_TODO_DESCRIPTION);
            const expected_result: ToDo[] = [
                {
                    description: FIRST_TODO_DESCRIPTION,
                    completed: false
                }
            ];
            const todos = await todo_canister.get_todos();

            return {
                ok: result === 0n && equal_todo_list(todos, expected_result)
            };
        }
    },
    {
        name: 'add second todo',
        test: async () => {
            const result = await todo_canister.add_todo(
                SECOND_TODO_DESCRIPTION
            );
            const expected_result: ToDo[] = [
                {
                    description: FIRST_TODO_DESCRIPTION,
                    completed: false
                },
                {
                    description: SECOND_TODO_DESCRIPTION,
                    completed: false
                }
            ];
            const todos = await todo_canister.get_todos();

            return {
                ok: result === 1n && equal_todo_list(todos, expected_result)
            };
        }
    },
    {
        name: 'show todos',
        test: async () => {
            const expected_result: string = `\n___TO-DOs___\n${FIRST_TODO_DESCRIPTION}\n${SECOND_TODO_DESCRIPTION}`;
            const todos = await todo_canister.show_todos();
            return {
                ok: todos === expected_result
            };
        }
    },
    {
        name: 'complete todo',
        test: async () => {
            const result = await todo_canister.complete_todo(1n);
            const expected_result: ToDo[] = [
                {
                    description: FIRST_TODO_DESCRIPTION,
                    completed: false
                },
                {
                    description: SECOND_TODO_DESCRIPTION,
                    completed: true
                }
            ];
            const todos = await todo_canister.get_todos();

            return {
                ok:
                    result === undefined &&
                    equal_todo_list(todos, expected_result)
            };
        }
    },
    {
        name: 'show completed todos',
        test: async () => {
            const expected_result: string = `\n___TO-DOs___\n${FIRST_TODO_DESCRIPTION}\n${SECOND_TODO_DESCRIPTION} ✔`;
            const todos = await todo_canister.show_todos();
            return {
                ok: todos === expected_result
            };
        }
    },
    {
        name: 'clear completed todos',
        test: async () => {
            const result = await todo_canister.clear_completed();
            const expected_result: ToDo[] = [
                {
                    description: FIRST_TODO_DESCRIPTION,
                    completed: false
                }
            ];
            const todos = await todo_canister.get_todos();

            return {
                ok:
                    result === undefined &&
                    equal_todo_list(todos, expected_result)
            };
        }
    },
    {
        name: 'complete todo',
        test: async () => {
            const result = await todo_canister.complete_todo(0n);
            const expected_result: ToDo[] = [
                {
                    description: FIRST_TODO_DESCRIPTION,
                    completed: true
                }
            ];
            const todos = await todo_canister.get_todos();

            return {
                ok:
                    result === undefined &&
                    equal_todo_list(todos, expected_result)
            };
        }
    },
    {
        name: 'clear completed todos',
        test: async () => {
            const result = await todo_canister.clear_completed();
            const todos = await todo_canister.get_todos();

            return {
                ok: result === undefined && todos.length === 0
            };
        }
    }
];

run_tests(tests);

function equal_todo_list(list_a: ToDo[], list_b: ToDo[]): boolean {
    return (
        list_a.length === list_b.length &&
        list_a.every((item, index) => equal_todo(item, list_b[index]))
    );
}

function equal_todo(todo_a: ToDo, todo_b: ToDo): boolean {
    return (
        todo_a.description === todo_b.description &&
        todo_a.completed === todo_b.completed
    );
}
