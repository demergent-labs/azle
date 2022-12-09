export const idlFactory = ({ IDL }) => {
    return IDL.Service({
        accessible: IDL.Func([], [IDL.Bool], []),
        also_inaccessible: IDL.Func([], [IDL.Bool], []),
        inaccessible: IDL.Func([], [IDL.Bool], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
