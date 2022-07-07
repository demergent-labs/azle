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
    const Options = IDL.Variant({
        Large: IDL.Null,
        Small: IDL.Null,
        Medium: IDL.Null
    });
    const RawReply = IDL.Record({
        int: IDL.Int,
        blob: IDL.Vec(IDL.Nat8),
        bool: IDL.Bool,
        text: IDL.Text,
        variant: Options
    });
    return IDL.Service({
        manual_query: IDL.Func([IDL.Text], [IDL.Text], ['query']),
        manual_update: IDL.Func([IDL.Text], [IDL.Text], []),
        query_blob: IDL.Func([], [IDL.Vec(IDL.Nat8)], ['query']),
        query_float32: IDL.Func([], [IDL.Float32], ['query']),
        query_int8: IDL.Func([], [IDL.Int8], ['query']),
        query_nat: IDL.Func([], [IDL.Nat], ['query']),
        query_null: IDL.Func([], [IDL.Null], ['query']),
        query_record: IDL.Func([], [Element], ['query']),
        query_reserved: IDL.Func([], [IDL.Reserved], ['query']),
        query_string: IDL.Func([], [IDL.Text], ['query']),
        query_variant: IDL.Func([], [Gas], ['query']),
        reply_raw: IDL.Func([], [RawReply], []),
        update_blob: IDL.Func([], [IDL.Vec(IDL.Nat8)], []),
        update_float32: IDL.Func([], [IDL.Float32], []),
        update_int8: IDL.Func([], [IDL.Int8], []),
        update_nat: IDL.Func([], [IDL.Nat], []),
        update_null: IDL.Func([], [IDL.Null], []),
        update_record: IDL.Func([], [Element], []),
        update_reserved: IDL.Func([], [IDL.Reserved], []),
        update_string: IDL.Func([], [IDL.Text], []),
        update_variant: IDL.Func([], [Gas], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
