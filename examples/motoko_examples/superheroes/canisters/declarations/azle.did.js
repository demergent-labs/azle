export const idlFactory = ({ IDL }) => {
    const List = IDL.Rec();
    List.fill(IDL.Tuple(IDL.Text, IDL.Opt(List)));
    const Superhero = IDL.Record({
        superpowers: IDL.Opt(List),
        name: IDL.Text
    });
    return IDL.Service({
        create: IDL.Func([Superhero], [IDL.Nat32], []),
        deleteHero: IDL.Func([IDL.Nat32], [IDL.Bool], []),
        read: IDL.Func([IDL.Nat32], [IDL.Opt(Superhero)], ['query']),
        update: IDL.Func([IDL.Nat32, Superhero], [IDL.Bool], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
