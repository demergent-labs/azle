export const idlFactory = ({ IDL }) => {
    return IDL.Service({
        get_blob: IDL.Func([], [IDL.Vec(IDL.Nat8)], ['query']),
        get_blobs: IDL.Func([], [IDL.Vec(IDL.Vec(IDL.Nat8))], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
