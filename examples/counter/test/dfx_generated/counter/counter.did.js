export const idlFactory = ({ IDL }) => {
    return IDL.Service({
        increment_count: IDL.Func([], [IDL.Nat64], []),
        read_count: IDL.Func([], [IDL.Nat64], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
