import { IDL, query, update } from 'azle';

export const ToDo = IDL.Record({
    description: IDL.Text,
    completed: IDL.Bool
});
export type ToDo = {
    description: string;
    completed: boolean;
};

export default class {
    todos: Map<bigint, ToDo> = new Map();
    nextId: bigint = 0n;

    @query([], IDL.Vec(ToDo))
    getTodos(): ToDo[] {
        return Array.from(this.todos.values());
    }

    // Returns the ID that was given to the ToDo item
    @update([IDL.Text], IDL.Nat)
    addTodo(description: string): bigint {
        const id = this.nextId;
        this.todos.set(id, {
            description: description,
            completed: false
        });
        this.nextId += 1n;

        return id;
    }

    @update([IDL.Nat])
    completeTodo(id: bigint): void {
        let todo = this.todos.get(id);

        if (todo !== undefined) {
            this.todos.set(id, {
                description: todo.description,
                completed: true
            });
        }
    }

    @query([], IDL.Text)
    showTodos(): string {
        let output = '\n___TO-DOs___';
        for (const todoEntry of [...this.todos]) {
            output += `\n${todoEntry[1].description}`;
            if (todoEntry[1].completed) {
                output += ' ✔';
            }
        }
        return output;
    }

    @update([])
    clearCompleted(): void {
        // NOTE: this syntax isn't supported in Boa. If we revert to using Boa
        // we'll need to revert the syntax to:
        // ```ts
        // todos = new Map(
        //     [...todos].filter((value) => !value[1].completed)
        // );
        // ```
        //  See: https://github.com/demergent-labs/azle/issues/574
        this.todos = new Map(
            [...this.todos].filter(([_key, value]) => !value.completed)
        );
    }
}
