export const idlFactory = ({ IDL }) => {
    return IDL.Service({ stable_size: IDL.Func([], [IDL.Nat32], []) });
};
export const init = ({ IDL }) => {
    return [];
};
