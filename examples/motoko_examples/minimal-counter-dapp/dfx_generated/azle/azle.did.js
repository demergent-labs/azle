export const idlFactory = ({ IDL }) => {
    const PerfResult = IDL.Record({
        wasmBodyOnly: IDL.Nat64,
        wasmIncludingPrelude: IDL.Nat64
    });
    return IDL.Service({
        count: IDL.Func([], [IDL.Nat], []),
        getCount: IDL.Func([], [IDL.Nat], ['query']),
        getPerfResult: IDL.Func([], [IDL.Opt(PerfResult)], ['query']),
        reset: IDL.Func([], [IDL.Nat], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
