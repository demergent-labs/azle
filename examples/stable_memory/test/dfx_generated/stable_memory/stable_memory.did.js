export const idlFactory = ({ IDL }) => {
    return IDL.Service({
        stable64_size: IDL.Func([], [IDL.Nat64], ['query']),
        stable_size: IDL.Func([], [IDL.Nat32], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
