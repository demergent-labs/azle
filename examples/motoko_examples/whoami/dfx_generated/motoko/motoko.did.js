export const idlFactory = ({ IDL }) => {
    const PerfResult = IDL.Record({
        wasm_body_only: IDL.Nat64,
        wasm_including_prelude: IDL.Nat64
    });
    const WhoAmI = IDL.Service({
        argument: IDL.Func([], [IDL.Principal], ['query']),
        get_perf_result: IDL.Func([], [IDL.Opt(PerfResult)], ['query']),
        id: IDL.Func([], [IDL.Principal], []),
        id_quick: IDL.Func([], [IDL.Principal], []),
        installer: IDL.Func([], [IDL.Principal], ['query']),
        whoami: IDL.Func([], [IDL.Principal], [])
    });
    return WhoAmI;
};
export const init = ({ IDL }) => {
    return [IDL.Principal];
};
