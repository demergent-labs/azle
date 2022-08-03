export const idlFactory = ({ IDL }) => {
    const PerfResult = IDL.Record({
        wasm_body_only: IDL.Nat64,
        wasm_including_prelude: IDL.Nat64
    });
    return IDL.Service({
        get_current_message: IDL.Func([], [IDL.Text], ['query']),
        get_perf_result: IDL.Func([], [IDL.Opt(PerfResult)], ['query']),
        update: IDL.Func([IDL.Text], [], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
