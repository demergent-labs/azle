export const idlFactory = ({ IDL }) => {
    return IDL.Service({
        accessible: IDL.Func([], [IDL.Bool], []),
        alsoInaccessible: IDL.Func([], [IDL.Bool], []),
        getInitialized: IDL.Func([], [IDL.Bool], ['query']),
        inaccessible: IDL.Func([], [IDL.Bool], []),
        throw_bigint: IDL.Func([], [], ['query']),
        throw_boolean: IDL.Func([], [], ['query']),
        throw_class: IDL.Func([], [], ['query']),
        throw_custom_error: IDL.Func([], [], ['query']),
        throw_int: IDL.Func([], [], ['query']),
        throw_null: IDL.Func([], [], ['query']),
        throw_null_reference: IDL.Func([], [], ['query']),
        throw_object: IDL.Func([], [], ['query']),
        throw_rational: IDL.Func([], [], ['query']),
        throw_string: IDL.Func([], [], ['query']),
        throw_symbol: IDL.Func([], [], ['query']),
        throw_undefined: IDL.Func([], [], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
