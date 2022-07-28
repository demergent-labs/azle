export const idlFactory = ({ IDL }) => {
    return IDL.Service({
        candid_decode: IDL.Func([IDL.Vec(IDL.Nat8)], [IDL.Text], ['query']),
        candid_encode: IDL.Func([IDL.Text], [IDL.Vec(IDL.Nat8)], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
