export const idlFactory = ({ IDL }) => {
    const rec_28 = IDL.Rec();
    const rec_33 = IDL.Rec();
    const rec_36 = IDL.Rec();
    rec_28.fill(IDL.Tuple(IDL.Text, IDL.Opt(rec_28)));
    rec_33.fill(IDL.Tuple(IDL.Text, IDL.Opt(rec_33)));
    rec_36.fill(IDL.Tuple(IDL.Text, IDL.Opt(rec_36)));
    return IDL.Service({
        create: IDL.Func(
            [IDL.Record({ superpowers: IDL.Opt(rec_28), name: IDL.Text })],
            [IDL.Nat32],
            []
        ),
        deleteHero: IDL.Func([IDL.Nat32], [IDL.Bool], []),
        read: IDL.Func(
            [IDL.Nat32],
            [
                IDL.Opt(
                    IDL.Record({ superpowers: IDL.Opt(rec_33), name: IDL.Text })
                )
            ],
            ['query']
        ),
        update: IDL.Func(
            [
                IDL.Nat32,
                IDL.Record({ superpowers: IDL.Opt(rec_36), name: IDL.Text })
            ],
            [IDL.Bool],
            []
        )
    });
};
export const init = ({ IDL }) => {
    return [];
};
