import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface PerfResult {
    wasm_body_only: bigint;
    wasm_including_prelude: bigint;
}
export interface ToDo {
    completed: boolean;
    description: string;
}
export interface _SERVICE {
    add_todo: ActorMethod<[string], bigint>;
    clear_completed: ActorMethod<[], undefined>;
    complete_todo: ActorMethod<[bigint], undefined>;
    get_perf_result: ActorMethod<[], [] | [PerfResult]>;
    get_todos: ActorMethod<[], Array<ToDo>>;
    show_todos: ActorMethod<[], string>;
}
