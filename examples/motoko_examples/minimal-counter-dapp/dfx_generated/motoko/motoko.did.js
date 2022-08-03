export const idlFactory = ({ IDL }) => {
    const PerfResult = IDL.Record({
        wasm_body_only: IDL.Nat64,
        wasm_including_prelude: IDL.Nat64
    });
    return IDL.Service({
        count: IDL.Func([], [IDL.Nat], []),
        get_count: IDL.Func([], [IDL.Nat], ['query']),
        get_perf_result: IDL.Func([], [IDL.Opt(PerfResult)], ['query']),
        reset: IDL.Func([], [IDL.Nat], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
