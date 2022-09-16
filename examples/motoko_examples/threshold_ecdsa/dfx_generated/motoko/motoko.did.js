export const idlFactory = ({ IDL }) => {
    return IDL.Service({
        public_key: IDL.Func(
            [],
            [
                IDL.Variant({
                    Ok: IDL.Record({ public_key: IDL.Vec(IDL.Nat8) }),
                    Err: IDL.Text
                })
            ],
            []
        ),
        sign: IDL.Func(
            [IDL.Vec(IDL.Nat8)],
            [
                IDL.Variant({
                    Ok: IDL.Record({ signature: IDL.Vec(IDL.Nat8) }),
                    Err: IDL.Text
                })
            ],
            []
        )
    });
};
export const init = ({ IDL }) => {
    return [];
};
