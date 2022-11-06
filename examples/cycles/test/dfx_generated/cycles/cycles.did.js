export const idlFactory = ({ IDL }) => {
    return IDL.Service({
        get_canister_balance: IDL.Func([], [IDL.Nat64], ['query']),
        get_canister_balance128: IDL.Func([], [IDL.Nat], ['query']),
        receive_cycles: IDL.Func([], [IDL.Nat64], []),
        receive_cycles128: IDL.Func([], [IDL.Nat], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
