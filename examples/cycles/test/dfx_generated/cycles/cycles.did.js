export const idlFactory = ({ IDL }) => {
    return IDL.Service({
        getCanisterBalance: IDL.Func([], [IDL.Nat64], ['query']),
        getCanisterBalance128: IDL.Func([], [IDL.Nat], ['query']),
        receiveCycles: IDL.Func([], [IDL.Nat64], []),
        receiveCycles128: IDL.Func([], [IDL.Nat], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
