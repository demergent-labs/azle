export const idlFactory = ({ IDL }) => {
    return IDL.Service({
        get_bytes: IDL.Func([IDL.Vec(IDL.Nat8)], [IDL.Vec(IDL.Nat8)], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
