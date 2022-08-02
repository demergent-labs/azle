export const idlFactory = ({ IDL }) => {
    return IDL.Service({ say: IDL.Func([IDL.Text], [IDL.Text], ['query']) });
};
export const init = ({ IDL }) => {
    return [];
};
