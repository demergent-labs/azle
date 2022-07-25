export const idlFactory = ({ IDL }) => {
    const PerfResult = IDL.Record({
        wasm_body_only: IDL.Nat64,
        wasm_including_prelude: IDL.Nat64
    });
    const Name = IDL.Text;
    const Phone = IDL.Text;
    const Entry = IDL.Record({ desc: IDL.Text, phone: Phone });
    return IDL.Service({
        get_perf_result: IDL.Func([], [IDL.Opt(PerfResult)], ['query']),
        insert: IDL.Func([Name, Entry], [], []),
        lookup: IDL.Func([Name], [IDL.Opt(Entry)], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
