export const idlFactory = ({ IDL }) => {
    const List = IDL.Rec();
    List.fill(IDL.Tuple(IDL.Text, IDL.Opt(List)));
    const Superhero = IDL.Record({
        superpowers: IDL.Opt(List),
        name: IDL.Text
    });
    const PerfResult = IDL.Record({
        wasm_body_only: IDL.Nat64,
        wasm_including_prelude: IDL.Nat64
    });
    return IDL.Service({
        create: IDL.Func([Superhero], [IDL.Nat32], []),
        delete_hero: IDL.Func([IDL.Nat32], [IDL.Bool], []),
        get_perf_result: IDL.Func([], [IDL.Opt(PerfResult)], ['query']),
        read: IDL.Func([IDL.Nat32], [IDL.Opt(Superhero)], ['query']),
        update: IDL.Func([IDL.Nat32, Superhero], [IDL.Bool], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
