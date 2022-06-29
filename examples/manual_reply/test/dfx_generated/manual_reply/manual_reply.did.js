export const idlFactory = ({ IDL }) => {
    return IDL.Service({
        manual_query: IDL.Func([IDL.Text], [IDL.Text], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
