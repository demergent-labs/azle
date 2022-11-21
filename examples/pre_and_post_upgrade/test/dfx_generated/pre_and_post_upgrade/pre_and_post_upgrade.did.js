export const idlFactory = ({ IDL }) => {
    const Entry = IDL.Record({ key: IDL.Text, value: IDL.Nat64 });
    return IDL.Service({
        get_entries: IDL.Func([], [IDL.Vec(Entry)], ['query']),
        set_entry: IDL.Func([Entry], [], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
