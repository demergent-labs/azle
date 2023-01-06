export const idlFactory = ({ IDL }) => {
    const StringQueryResult = IDL.Variant({ ok: IDL.Text, err: IDL.Text });
    return IDL.Service({
        deep_query: IDL.Func([], [StringQueryResult], ['query']),
        inc_counter: IDL.Func([], [IDL.Nat], ['query']),
        manual_query: IDL.Func([], [IDL.Text], ['query']),
        simple_query: IDL.Func([], [IDL.Text], ['query']),
        update_query: IDL.Func([], [IDL.Text], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
