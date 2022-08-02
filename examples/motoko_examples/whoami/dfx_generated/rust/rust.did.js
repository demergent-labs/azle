export const idlFactory = ({ IDL }) => {
    const PerfResult = IDL.Record({
        wasm_body_only: IDL.Nat64,
        wasm_including_prelude: IDL.Nat64
    });
    return IDL.Service({
        argument: IDL.Func([], [IDL.Principal], ['query']),
        get_perf_result: IDL.Func([], [IDL.Opt(PerfResult)], ['query']),
        id: IDL.Func([], [IDL.Principal], []),
        id_quick: IDL.Func([], [IDL.Principal], ['query']),
        installer: IDL.Func([], [IDL.Principal], ['query']),
        whoami: IDL.Func([], [IDL.Principal], [])
    });
};
export const init = ({ IDL }) => {
    return [IDL.Principal];
};
