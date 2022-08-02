export const idlFactory = ({ IDL }) => {
    return IDL.Service({ simple_query: IDL.Func([], [IDL.Text], ['query']) });
};
export const init = ({ IDL }) => {
    return [];
};
