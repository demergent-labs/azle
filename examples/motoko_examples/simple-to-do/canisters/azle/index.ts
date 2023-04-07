import { ic, nat, nat64, Opt, $query, Record, $update, Vec } from 'azle';

//#region Performance
type PerfResult = Record<{
    wasmBodyOnly: nat64;
    wasmIncludingPrelude: nat64;
}>;

let perfResult: Opt<PerfResult> = null;

$query;
export function getPerfResult(): Opt<PerfResult> {
    return perfResult;
}

function recordPerformance(start: nat64, end: nat64): void {
    perfResult = {
        wasmBodyOnly: end - start,
        wasmIncludingPrelude: ic.performanceCounter(0)
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
export function getTodos(): Vec<ToDo> {
    return Array.from(todos.values());
}

// Returns the ID that was given to the ToDo item
$update;
export function addTodo(description: string): nat {
    const perfStart = ic.performanceCounter(0);

    const id = nextId;
    todos.set(id, {
        description: description,
        completed: false
    });
    nextId += 1n;

    const perfEnd = ic.performanceCounter(0);

    recordPerformance(perfStart, perfEnd);

    return id;
}

$update;
export function completeTodo(id: nat): void {
    const perfStart = ic.performanceCounter(0);

    let todo = todos.get(id);

    if (todo !== undefined) {
        todos.set(id, {
            description: todo.description,
            completed: true
        });
    }
    const perfEnd = ic.performanceCounter(0);

    recordPerformance(perfStart, perfEnd);
}

$query;
export function showTodos(): string {
    let output = '\n___TO-DOs___';
    for (const todoEntry of [...todos]) {
        output += `\n${todoEntry[1].description}`;
        if (todoEntry[1].completed) {
            output += ' ✔';
        }
    }
    return output;
}

$update;
export function clearCompleted(): void {
    const perfStart = ic.performanceCounter(0);

    // TODO why doesn't this work? https://github.com/demergent-labs/azle/issues/574
    // todos = new Map([...todos].filter(([key, value]) => !value.completed));
    todos = new Map([...todos].filter((value) => !value[1].completed));

    const perfEnd = ic.performanceCounter(0);

    recordPerformance(perfStart, perfEnd);
}
