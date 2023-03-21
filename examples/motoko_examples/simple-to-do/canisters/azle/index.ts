import { ic, nat, nat64, Opt, $query, Record, $update } from 'azle';

//#region Performance
type PerfResult = Record<{
    wasm_body_only: nat64;
    wasm_including_prelude: nat64;
}>;

let perf_result: Opt<PerfResult> = null;

$query;
export function get_perf_result(): Opt<PerfResult> {
    return perf_result;
}

function record_performance(start: nat64, end: nat64): void {
    perf_result = {
        wasm_body_only: end - start,
        wasm_including_prelude: ic.performanceCounter(0)
    };
}
//#endregion

export type ToDo = Record<{
    description: string;
    completed: boolean;
}>;

let todos: Map<nat, ToDo> = new Map();
let nextId: nat = 0n;

$query;
export function get_todos(): ToDo[] {
    return Array.from(todos.values());
}

// Returns the ID that was given to the ToDo item
$update;
export function add_todo(description: string): nat {
    const perf_start = ic.performanceCounter(0);

    const id = nextId;
    todos.set(id, {
        description: description,
        completed: false
    });
    nextId += 1n;

    const perf_end = ic.performanceCounter(0);

    record_performance(perf_start, perf_end);

    return id;
}

$update;
export function complete_todo(id: nat): void {
    const perf_start = ic.performanceCounter(0);

    let todo = todos.get(id);

    if (todo !== undefined) {
        todos.set(id, {
            description: todo.description,
            completed: true
        });
    }
    const perf_end = ic.performanceCounter(0);

    record_performance(perf_start, perf_end);
}

$query;
export function show_todos(): string {
    let output = '\n___TO-DOs___';
    for (const todo_entry of [...todos]) {
        output += `\n${todo_entry[1].description}`;
        if (todo_entry[1].completed) {
            output += ' ✔';
        }
    }
    return output;
}

$update;
export function clear_completed(): void {
    const perf_start = ic.performanceCounter(0);

    // TODO why doesn't this work? https://github.com/demergent-labs/azle/issues/574
    // todos = new Map([...todos].filter(([key, value]) => !value.completed));
    todos = new Map([...todos].filter((value) => !value[1].completed));

    const perf_end = ic.performanceCounter(0);

    record_performance(perf_start, perf_end);
}
