export const idlFactory = ({ IDL }) => {
    return IDL.Service({
        get_empty: IDL.Func([], [IDL.Empty], ['query']),
        get_float32: IDL.Func([], [IDL.Float32], ['query']),
        get_float64: IDL.Func([], [IDL.Float64], ['query']),
        get_int: IDL.Func([], [IDL.Int], ['query']),
        get_int16: IDL.Func([], [IDL.Int16], ['query']),
        get_int32: IDL.Func([], [IDL.Int32], ['query']),
        get_int64: IDL.Func([], [IDL.Int64], ['query']),
        get_int8: IDL.Func([], [IDL.Int8], ['query']),
        get_nat: IDL.Func([], [IDL.Nat], ['query']),
        get_nat16: IDL.Func([], [IDL.Nat16], ['query']),
        get_nat32: IDL.Func([], [IDL.Nat32], ['query']),
        get_nat64: IDL.Func([], [IDL.Nat64], ['query']),
        get_nat8: IDL.Func([], [IDL.Nat8], ['query']),
        get_null: IDL.Func([], [IDL.Null], ['query']),
        get_principal: IDL.Func([], [IDL.Principal], ['query']),
        get_reserved: IDL.Func([], [IDL.Reserved], ['query']),
        print_empty: IDL.Func([IDL.Empty], [IDL.Empty], ['query']),
        print_float32: IDL.Func([IDL.Float32], [IDL.Float32], ['query']),
        print_float64: IDL.Func([IDL.Float64], [IDL.Float64], ['query']),
        print_int: IDL.Func([IDL.Int], [IDL.Int], ['query']),
        print_int16: IDL.Func([IDL.Int16], [IDL.Int16], ['query']),
        print_int32: IDL.Func([IDL.Int32], [IDL.Int32], ['query']),
        print_int64: IDL.Func([IDL.Int64], [IDL.Int64], ['query']),
        print_int8: IDL.Func([IDL.Int8], [IDL.Int8], ['query']),
        print_nat: IDL.Func([IDL.Nat], [IDL.Nat], ['query']),
        print_nat16: IDL.Func([IDL.Nat16], [IDL.Nat16], ['query']),
        print_nat32: IDL.Func([IDL.Nat32], [IDL.Nat32], ['query']),
        print_nat64: IDL.Func([IDL.Nat64], [IDL.Nat64], ['query']),
        print_nat8: IDL.Func([IDL.Nat8], [IDL.Nat8], ['query']),
        print_null: IDL.Func([IDL.Null], [IDL.Null], ['query']),
        print_principal: IDL.Func([IDL.Principal], [IDL.Principal], ['query']),
        print_reserved: IDL.Func([IDL.Reserved], [IDL.Reserved], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
