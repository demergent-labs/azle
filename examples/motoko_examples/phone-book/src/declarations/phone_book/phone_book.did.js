export const idlFactory = ({ IDL }) => {
    const rec_0 = IDL.Record({ desc: IDL.Text, phone: IDL.Text });
    const rec_1 = IDL.Record({ desc: IDL.Text, phone: IDL.Text });
    return IDL.Service({
        insert: IDL.Func([IDL.Text, rec_0], [], []),
        lookup: IDL.Func([IDL.Text], [IDL.Opt(rec_1)], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
