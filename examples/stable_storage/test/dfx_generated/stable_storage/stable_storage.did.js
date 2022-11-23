export const idlFactory = ({ IDL }) => {
    const Child = IDL.Record({ id: IDL.Text });
    const User = IDL.Record({ id: IDL.Text, children: IDL.Vec(Child) });
    return IDL.Service({
        read_stable_blob: IDL.Func([], [IDL.Vec(IDL.Nat8)], ['query']),
        read_stable_blobs: IDL.Func(
            [],
            [IDL.Vec(IDL.Vec(IDL.Nat8))],
            ['query']
        ),
        read_stable_float32: IDL.Func([], [IDL.Float32], ['query']),
        read_stable_float64: IDL.Func([], [IDL.Float64], ['query']),
        read_stable_int: IDL.Func([], [IDL.Int], ['query']),
        read_stable_int16: IDL.Func([], [IDL.Int16], ['query']),
        read_stable_int32: IDL.Func([], [IDL.Int32], ['query']),
        read_stable_int64: IDL.Func([], [IDL.Int64], ['query']),
        read_stable_int8: IDL.Func([], [IDL.Int8], ['query']),
        read_stable_ints: IDL.Func([], [IDL.Vec(IDL.Int)], ['query']),
        read_stable_nat: IDL.Func([], [IDL.Nat], ['query']),
        read_stable_nat16: IDL.Func([], [IDL.Nat16], ['query']),
        read_stable_nat32: IDL.Func([], [IDL.Nat32], ['query']),
        read_stable_nat64: IDL.Func([], [IDL.Nat64], ['query']),
        read_stable_nat8: IDL.Func([], [IDL.Nat8], ['query']),
        read_stable_principal: IDL.Func([], [IDL.Principal], ['query']),
        read_stable_string: IDL.Func([], [IDL.Text], ['query']),
        read_stable_user: IDL.Func([], [User], ['query']),
        write_stable_blob: IDL.Func([IDL.Vec(IDL.Nat8)], [], []),
        write_stable_blobs: IDL.Func([IDL.Vec(IDL.Vec(IDL.Nat8))], [], []),
        write_stable_float32: IDL.Func([IDL.Float32], [], []),
        write_stable_float64: IDL.Func([IDL.Float64], [], []),
        write_stable_int: IDL.Func([IDL.Int], [], []),
        write_stable_int16: IDL.Func([IDL.Int16], [], []),
        write_stable_int32: IDL.Func([IDL.Int32], [], []),
        write_stable_int64: IDL.Func([IDL.Int64], [], []),
        write_stable_int8: IDL.Func([IDL.Int8], [], []),
        write_stable_ints: IDL.Func([IDL.Vec(IDL.Int)], [], []),
        write_stable_nat: IDL.Func([IDL.Nat], [], []),
        write_stable_nat16: IDL.Func([IDL.Nat16], [], []),
        write_stable_nat32: IDL.Func([IDL.Nat32], [], []),
        write_stable_nat64: IDL.Func([IDL.Nat64], [], []),
        write_stable_nat8: IDL.Func([IDL.Nat8], [], []),
        write_stable_principal: IDL.Func([IDL.Principal], [], []),
        write_stable_string: IDL.Func([IDL.Text], [], []),
        write_stable_user: IDL.Func([User], [], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
