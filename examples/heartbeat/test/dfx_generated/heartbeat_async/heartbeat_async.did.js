export const idlFactory = ({ IDL }) => {
    return IDL.Service({
        get_initialized: IDL.Func([], [IDL.Vec(IDL.Nat8)], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
