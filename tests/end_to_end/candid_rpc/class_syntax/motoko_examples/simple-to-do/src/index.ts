import { IDL, query, update } from 'azle';

export const ToDo = Record({
    description: text,
    completed: bool
});
export type ToDo = typeof ToDo.tsType;

let todos: Map<nat, ToDo> = new Map();
let nextId: nat = 0n;

export default class {
    @query([], Vec(ToDo))
    getTodos() {
        return Array.from(todos.values());
    }
    // Returns the ID that was given to the ToDo item
    @update([text], nat)
    addTodo(description) {
        const id = nextId;
        todos.set(id, {
            description: description,
            completed: false
        });
        nextId += 1n;

        return id;
    }
    @update([nat])
    completeTodo(id) {
        let todo = todos.get(id);

        if (todo !== undefined) {
            todos.set(id, {
                description: todo.description,
                completed: true
            });
        }
    }
    @query([], text)
    showTodos() {
        let output = '\n___TO-DOs___';
        for (const todoEntry of [...todos]) {
            output += `\n${todoEntry[1].description}`;
            if (todoEntry[1].completed) {
                output += ' ✔';
            }
        }
        return output;
    }
    @update([])
    clearCompleted() {
        // NOTE: this syntax isn't supported in Boa. If we revert to using Boa
        // we'll need to revert the syntax to:
        // ```ts
        // todos = new Map(
        //     [...todos].filter((value) => !value[1].completed)
        // );
        // ```
        //  See: https://github.com/demergent-labs/azle/issues/574
        todos = new Map([...todos].filter(([_key, value]) => !value.completed));
    }
}