export const idlFactory = ({ IDL }) => {
    return IDL.Service({ simple_query: IDL.Func([], [IDL.Text], []) });
};
export const init = ({ IDL }) => {
    return [];
};
