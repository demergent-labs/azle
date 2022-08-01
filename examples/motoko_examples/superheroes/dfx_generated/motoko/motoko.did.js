export const idlFactory = ({ IDL }) => {
    const List = IDL.Rec();
    List.fill(IDL.Opt(IDL.Tuple(IDL.Text, List)));
    const Superhero = IDL.Record({ superpowers: List, name: IDL.Text });
    const SuperheroId = IDL.Nat32;
    const PerfResult = IDL.Record({
        wasm_body_only: IDL.Nat64,
        wasm_including_prelude: IDL.Nat64
    });
    return IDL.Service({
        create: IDL.Func([Superhero], [SuperheroId], []),
        delete_hero: IDL.Func([SuperheroId], [IDL.Bool], []),
        get_perf_result: IDL.Func([], [IDL.Opt(PerfResult)], ['query']),
        read: IDL.Func([SuperheroId], [IDL.Opt(Superhero)], ['query']),
        update: IDL.Func([SuperheroId, Superhero], [IDL.Bool], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
