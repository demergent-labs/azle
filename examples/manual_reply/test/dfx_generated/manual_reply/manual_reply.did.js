export const idlFactory = ({ IDL }) => {
    const Orbital = IDL.Record({ electrons: IDL.Nat8, layer: IDL.Nat8 });
    const Gas = IDL.Variant({
        Elemental: IDL.Null,
        Mixed: IDL.Null,
        Toxic: IDL.Null
    });
    const Solid = IDL.Record({ element: IDL.Text });
    const State = IDL.Variant({
        Gas: Gas,
        Solid: Solid,
        Liquid: IDL.Null
    });
    const Element = IDL.Record({
        id: IDL.Text,
        orbitals: IDL.Vec(Orbital),
        state: State
    });
    return IDL.Service({
        manual_query: IDL.Func([IDL.Text], [IDL.Text], ['query']),
        manual_update: IDL.Func([IDL.Text], [IDL.Text], []),
        reply_blob: IDL.Func([], [IDL.Vec(IDL.Nat8)], []),
        reply_float32: IDL.Func([], [IDL.Float32], []),
        reply_int8: IDL.Func([], [IDL.Int8], []),
        reply_nat: IDL.Func([], [IDL.Nat], []),
        reply_record: IDL.Func([], [Element], []),
        reply_reserved: IDL.Func([], [IDL.Reserved], []),
        reply_string: IDL.Func([], [IDL.Text], []),
        reply_variant: IDL.Func([], [Gas], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
