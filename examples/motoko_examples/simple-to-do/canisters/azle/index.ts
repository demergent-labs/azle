import { Opt, Query, Update, ic, nat, nat16, nat64 } from 'azle';

//#region Performance
type PerfResult = {
    wasm_body_only: nat64;
    wasm_including_prelude: nat64;
};

let perf_result: Opt<PerfResult> = null;

export function get_perf_result(): Query<Opt<PerfResult>> {
    return perf_result;
}

function record_performance(start: nat64, end: nat64): void {
    perf_result = {
        wasm_body_only: end - start,
        wasm_including_prelude: ic.performance_counter(0)
    };
}
//#endregion

export type ToDo = {
    description: string;
    completed: boolean;
};

let todos: Map<nat, ToDo> = new Map();
let nextId: nat = 0n;

export function get_todos(): Query<ToDo[]> {
    return Array.from(todos.values());
}

// Returns the ID that was given to the ToDo item
export function add_todo(description: string): Update<nat> {
    const perf_start = ic.performance_counter(0);

    const id = nextId;
    todos.set(id, {
        description: description,
        completed: false
    });
    nextId += 1n;

    const perf_end = ic.performance_counter(0);

    record_performance(perf_start, perf_end);

    return id;
}

export function complete_todo(id: nat): Update<void> {
    const perf_start = ic.performance_counter(0);

    let todo = todos.get(id);

    if (todo !== undefined) {
        todos.set(id, {
            description: todo.description,
            completed: true
        });
    }
    const perf_end = ic.performance_counter(0);

    record_performance(perf_start, perf_end);
}

export function show_todos(): Query<string> {
    let output = '\n___TO-DOs___';
    for (const todo_entry of [...todos]) {
        output += `\n${todo_entry[1].description}`;
        if (todo_entry[1].completed) {
            output += ' ✔';
        }
    }
    return output;
}

export function clear_completed(): Update<void> {
    const perf_start = ic.performance_counter(0);

    // TODO why doesn't this work? https://github.com/demergent-labs/azle/issues/574
    // todos = new Map([...todos].filter(([key, value]) => !value.completed));
    todos = new Map([...todos].filter((value) => !value[1].completed));

    const perf_end = ic.performance_counter(0);

    record_performance(perf_start, perf_end);
}
