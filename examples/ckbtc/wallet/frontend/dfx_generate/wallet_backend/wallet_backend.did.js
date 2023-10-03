export const idlFactory = ({ IDL }) => {
    return IDL.Service({
        getBalance: IDL.Func([], [IDL.Nat64], []),
        getDepositAddress: IDL.Func([], [IDL.Text], []),
        transfer: IDL.Func(
            [IDL.Text, IDL.Nat],
            [
                IDL.Variant({
                    Ok: IDL.Nat,
                    Err: IDL.Variant({
                        GenericError: IDL.Record({
                            message: IDL.Text,
                            error_code: IDL.Nat
                        }),
                        TemporarilyUnavailable: IDL.Null,
                        BadBurn: IDL.Record({ min_burn_amount: IDL.Nat }),
                        Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
                        BadFee: IDL.Record({ expected_fee: IDL.Nat }),
                        CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
                        TooOld: IDL.Null,
                        InsufficientFunds: IDL.Record({ balance: IDL.Nat })
                    })
                })
            ],
            []
        ),
        updateBalance: IDL.Func(
            [],
            [
                IDL.Variant({
                    Ok: IDL.Vec(
                        IDL.Variant({
                            ValueTooSmall: IDL.Record({
                                height: IDL.Nat32,
                                value: IDL.Nat64,
                                outpoint: IDL.Record({
                                    txid: IDL.Vec(IDL.Nat8),
                                    vout: IDL.Nat32
                                })
                            }),
                            Tainted: IDL.Record({
                                height: IDL.Nat32,
                                value: IDL.Nat64,
                                outpoint: IDL.Record({
                                    txid: IDL.Vec(IDL.Nat8),
                                    vout: IDL.Nat32
                                })
                            }),
                            Minted: IDL.Record({
                                minted_amount: IDL.Nat64,
                                block_index: IDL.Nat64,
                                utxo: IDL.Record({
                                    height: IDL.Nat32,
                                    value: IDL.Nat64,
                                    outpoint: IDL.Record({
                                        txid: IDL.Vec(IDL.Nat8),
                                        vout: IDL.Nat32
                                    })
                                })
                            }),
                            Checked: IDL.Record({
                                height: IDL.Nat32,
                                value: IDL.Nat64,
                                outpoint: IDL.Record({
                                    txid: IDL.Vec(IDL.Nat8),
                                    vout: IDL.Nat32
                                })
                            })
                        })
                    ),
                    Err: IDL.Variant({
                        GenericError: IDL.Record({
                            error_message: IDL.Text,
                            error_code: IDL.Nat64
                        }),
                        TemporarilyUnavailable: IDL.Text,
                        AlreadyProcessing: IDL.Null,
                        NoNewUtxos: IDL.Record({
                            required_confirmations: IDL.Nat32,
                            current_confirmations: IDL.Opt(IDL.Nat32)
                        })
                    })
                })
            ],
            []
        )
    });
};
export const init = ({ IDL }) => {
    return [];
};
