export const idlFactory = ({ IDL }) => {
    const EcdsaResult = IDL.Variant({
        ok: IDL.Vec(IDL.Nat8),
        err: IDL.Text
    });
    return IDL.Service({
        public_key: IDL.Func([], [EcdsaResult], []),
        sign: IDL.Func([IDL.Vec(IDL.Nat8)], [EcdsaResult], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
