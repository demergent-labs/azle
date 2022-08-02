export const idlFactory = ({ IDL }) => {
    const PerfResult = IDL.Record({
        wasm_body_only: IDL.Nat64,
        wasm_including_prelude: IDL.Nat64
    });
    return IDL.Service({
        add: IDL.Func([IDL.Int], [IDL.Int], []),
        clearall: IDL.Func([], [], []),
        div: IDL.Func([IDL.Int], [IDL.Opt(IDL.Int)], []),
        get_perf_result: IDL.Func([], [IDL.Opt(PerfResult)], ['query']),
        mul: IDL.Func([IDL.Int], [IDL.Int], []),
        sub: IDL.Func([IDL.Int], [IDL.Int], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
