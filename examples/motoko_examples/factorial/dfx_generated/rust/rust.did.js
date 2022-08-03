export const idlFactory = ({ IDL }) => {
    const PerfResult = IDL.Record({
        wasm_body_only: IDL.Nat64,
        wasm_including_prelude: IDL.Nat64
    });
    return IDL.Service({
        fac: IDL.Func([IDL.Nat], [IDL.Nat], []),
        get_perf_result: IDL.Func([], [IDL.Opt(PerfResult)], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
