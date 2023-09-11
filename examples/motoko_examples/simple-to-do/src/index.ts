import {
    bool,
    candid,
    nat,
    query,
    Record,
    Service,
    text,
    update,
    Vec,
    Void
} from 'azle';

export class ToDo extends Record {
    @candid(text)
    description: text;

    @candid(bool)
    completed: bool;
}

export default class extends Service {
    todos: Map<nat, ToDo> = new Map();
    nextId: nat = 0n;

    @query([], Vec(ToDo))
    getTodos(): Vec<ToDo> {
        return Array.from(this.todos.values());
    }

    // Returns the ID that was given to the ToDo item
    @update([text], nat)
    addTodo(description: text): nat {
        const id = this.nextId;
        this.todos.set(id, {
            description: description,
            completed: false
        });
        this.nextId += 1n;

        return id;
    }

    @update([nat], Void)
    completeTodo(id: nat): void {
        let todo = this.todos.get(id);

        if (todo !== undefined) {
            this.todos.set(id, {
                description: todo.description,
                completed: true
            });
        }
    }

    @query([], text)
    showTodos(): text {
        let output = '\n___TO-DOs___';
        for (const todoEntry of [...this.todos]) {
            output += `\n${todoEntry[1].description}`;
            if (todoEntry[1].completed) {
                output += ' ✔';
            }
        }
        return output;
    }

    @update([], Void)
    clearCompleted(): void {
        // NOTE: this syntax isn't supported in Boa. If we revert to using Boa
        // we'll need to revert the syntax to:
        // ```ts
        // this.todos = new Map(
        //     [...this.todos].filter((value) => !value[1].completed)
        // );
        // ```
        //  See: https://github.com/demergent-labs/azle/issues/574
        this.todos = new Map(
            [...this.todos].filter(([key, value]) => !value.completed)
        );
    }
}
