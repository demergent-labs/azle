export const idlFactory = ({ IDL }) => {
    return IDL.Service({ get: IDL.Func([IDL.Text], [IDL.Text], ['query']) });
};
export const init = ({ IDL }) => {
    return [];
};
