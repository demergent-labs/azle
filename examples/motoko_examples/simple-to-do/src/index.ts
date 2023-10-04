import {
    bool,
    Canister,
    nat,
    query,
    Record,
    text,
    update,
    Vec,
    Void
} from 'azle';

export const ToDo = Record({
    description: text,
    completed: bool
});

let todos: Map<nat, typeof ToDo> = new Map();
let nextId: nat = 0n;

export default Canister({
    getTodos: query([], Vec(ToDo), () => {
        return Array.from(todos.values());
    }),
    // Returns the ID that was given to the ToDo item
    addTodo: update([text], nat, (description) => {
        const id = nextId;
        todos.set(id, {
            description: description,
            completed: false
        });
        nextId += 1n;

        return id;
    }),
    completeTodo: update([nat], Void, (id) => {
        let todo = todos.get(id);

        if (todo !== undefined) {
            todos.set(id, {
                description: todo.description,
                completed: true
            });
        }
    }),
    showTodos: query([], text, () => {
        let output = '\n___TO-DOs___';
        for (const todoEntry of [...todos]) {
            output += `\n${todoEntry[1].description}`;
            if (todoEntry[1].completed) {
                output += ' ✔';
            }
        }
        return output;
    }),
    clearCompleted: update([], Void, () => {
        // NOTE: this syntax isn't supported in Boa. If we revert to using Boa
        // we'll need to revert the syntax to:
        // ```ts
        // todos = new Map(
        //     [...todos].filter((value) => !value[1].completed)
        // );
        // ```
        //  See: https://github.com/demergent-labs/azle/issues/574
        todos = new Map([...todos].filter(([key, value]) => !value.completed));
    })
});
