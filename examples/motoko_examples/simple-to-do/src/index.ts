import {
    bool,
    candid,
    nat,
    query,
    record,
    Record,
    text,
    update,
    Vec,
    Void
} from 'azle';

@record
export class ToDo extends Record {
    @candid(text)
    description: text;

    @candid(bool)
    completed: bool;
}

let todos: Map<nat, ToDo> = new Map();
let nextId: nat = 0n;

export default class {
    @query([], Vec(ToDo))
    getTodos(): Vec<ToDo> {
        return Array.from(todos.values());
    }

    // Returns the ID that was given to the ToDo item
    @update([text], nat)
    addTodo(description: text): nat {
        const id = nextId;
        todos.set(id, {
            description: description,
            completed: false
        });
        nextId += 1n;

        return id;
    }

    @update([nat], Void)
    completeTodo(id: nat): void {
        let todo = todos.get(id);

        if (todo !== undefined) {
            todos.set(id, {
                description: todo.description,
                completed: true
            });
        }
    }

    @query([], text)
    showTodos(): text {
        let output = '\n___TO-DOs___';
        for (const todoEntry of [...todos]) {
            output += `\n${todoEntry[1].description}`;
            if (todoEntry[1].completed) {
                output += ' ✔';
            }
        }
        return output;
    }

    @update([], Void)
    clearCompleted(): void {
        // TODO why doesn't this work? https://github.com/demergent-labs/azle/issues/574
        // todos = new Map([...todos].filter(([key, value]) => !value.completed));
        todos = new Map([...todos].filter((value) => !value[1].completed));
    }
}
