export const idlFactory = ({ IDL }) => {
    const PerfResult = IDL.Record({
        wasm_body_only: IDL.Nat64,
        wasm_including_prelude: IDL.Nat64
    });
    return IDL.Service({
        get: IDL.Func([IDL.Text], [IDL.Opt(IDL.Text)], []),
        get_perf_result: IDL.Func([], [IDL.Opt(PerfResult)], ['query']),
        set: IDL.Func([IDL.Text, IDL.Text], [], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
