export const idlFactory = ({ IDL }) => {
    return IDL.Service({
        contains_key: IDL.Func([IDL.Text], [IDL.Bool], ['query']),
        get: IDL.Func([IDL.Text], [IDL.Text], ['query']),
        insert: IDL.Func([IDL.Text, IDL.Text], [IDL.Text], ['query']),
        is_empty: IDL.Func([], [IDL.Bool], ['query']),
        len: IDL.Func([], [IDL.Nat64], ['query']),
        remove: IDL.Func([IDL.Text], [IDL.Opt(IDL.Text)], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
