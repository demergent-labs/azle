export const idlFactory = ({ IDL }) => {
    const Entry = IDL.Record({ desc: IDL.Text, phone: IDL.Text });
    return IDL.Service({
        insert: IDL.Func([IDL.Text, Entry], [], []),
        lookup: IDL.Func([IDL.Text], [IDL.Opt(Entry)], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
