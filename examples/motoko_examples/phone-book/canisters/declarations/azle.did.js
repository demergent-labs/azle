export const idlFactory = ({ IDL }) => {
    const PerfResult = IDL.Record({
        wasm_body_only: IDL.Nat64,
        wasm_including_prelude: IDL.Nat64
    });
    const Entry = IDL.Record({ desc: IDL.Text, phone: IDL.Text });
    return IDL.Service({
        get_perf_result: IDL.Func([], [IDL.Opt(PerfResult)], ['query']),
        insert: IDL.Func([IDL.Text, Entry], [], []),
        lookup: IDL.Func([IDL.Text], [IDL.Opt(Entry)], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
