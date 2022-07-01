export const idlFactory = ({ IDL }) => {
    return IDL.Service({
        manual_query: IDL.Func([IDL.Text], [IDL.Empty], ['query']),
        manual_update: IDL.Func([IDL.Text], [IDL.Empty], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
