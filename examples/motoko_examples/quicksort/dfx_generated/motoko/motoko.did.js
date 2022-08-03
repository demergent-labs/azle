export const idlFactory = ({ IDL }) => {
    const PerfResult = IDL.Record({
        wasm_body_only: IDL.Nat64,
        wasm_including_prelude: IDL.Nat64
    });
    return IDL.Service({
        get_perf_result: IDL.Func([], [IDL.Opt(PerfResult)], ['query']),
        sort: IDL.Func([IDL.Vec(IDL.Int)], [IDL.Vec(IDL.Int)], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
