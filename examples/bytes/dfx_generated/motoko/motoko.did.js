export const idlFactory = ({ IDL }) => {
    const PerfResult = IDL.Record({
        wasm_body_only: IDL.Nat64,
        wasm_including_prelude: IDL.Nat64
    });
    return IDL.Service({
        get_bytes: IDL.Func([IDL.Vec(IDL.Nat8)], [IDL.Vec(IDL.Nat8)], []),
        get_perf_result: IDL.Func([], [IDL.Opt(PerfResult)], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
