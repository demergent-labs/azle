export const idlFactory = ({ IDL }) => {
    const PerfResult = IDL.Record({
        wasm_body_only: IDL.Nat64,
        wasm_including_prelude: IDL.Nat64
    });
    return IDL.Service({
        get_perf_result: IDL.Func([], [IDL.Opt(PerfResult)], ['query']),
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
