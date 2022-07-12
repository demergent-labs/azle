export const idlFactory = ({ IDL }) => {
    return IDL.Service({
        get: IDL.Func([], [IDL.Nat], ['query']),
        inc: IDL.Func([], [], []),
        set: IDL.Func([IDL.Nat], [], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
