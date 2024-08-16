export const idlFactory = ({ IDL }) => {
    return IDL.Service({
        queryPerformanceCounter0: IDL.Func([IDL.Nat32], [IDL.Nat64], ['query']),
        queryPerformanceCounter1: IDL.Func([IDL.Nat32], [IDL.Nat64], ['query']),
        updatePerformanceCounter0: IDL.Func([IDL.Nat32], [IDL.Nat64], []),
        updatePerformanceCounter1: IDL.Func([IDL.Nat32], [IDL.Nat64], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
