export const idlFactory = ({ IDL }) => {
    return IDL.Service({
        count: IDL.Func([], [IDL.Nat], []),
        get_count: IDL.Func([], [IDL.Nat], ['query']),
        reset: IDL.Func([], [IDL.Nat], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
