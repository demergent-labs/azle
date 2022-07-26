export const idlFactory = ({ IDL }) => {
    const PerfResult = IDL.Record({
        wasm_body_only: IDL.Nat64,
        wasm_including_prelude: IDL.Nat64
    });
    const ToDo = IDL.Record({ completed: IDL.Bool, description: IDL.Text });
    return IDL.Service({
        add_todo: IDL.Func([IDL.Text], [IDL.Nat], []),
        clear_completed: IDL.Func([], [], []),
        complete_todo: IDL.Func([IDL.Nat], [], []),
        get_perf_result: IDL.Func([], [IDL.Opt(PerfResult)], ['query']),
        get_todos: IDL.Func([], [IDL.Vec(ToDo)], ['query']),
        show_todos: IDL.Func([], [IDL.Text], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
