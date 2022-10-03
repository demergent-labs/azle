export const idlFactory = ({ IDL }) => {
    const PublicKeyResult = IDL.Variant({
        ok: IDL.Record({ public_key: IDL.Vec(IDL.Nat8) }),
        err: IDL.Text
    });
    const SignResult = IDL.Variant({
        ok: IDL.Record({ signature: IDL.Vec(IDL.Nat8) }),
        err: IDL.Text
    });
    return IDL.Service({
        public_key: IDL.Func([], [PublicKeyResult], []),
        sign: IDL.Func([IDL.Vec(IDL.Nat8)], [SignResult], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
