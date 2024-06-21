export const idlFactory = ({ IDL }) => {
    const _InlineUtxoOutpoint = IDL.Record({
        txid: IDL.Vec(IDL.Nat8),
        vout: IDL.Nat32
    });
    const Utxo = IDL.Record({
        height: IDL.Nat32,
        value: IDL.Nat64,
        outpoint: _InlineUtxoOutpoint
    });
    const _InlineUtxoStatusMinted = IDL.Record({
        minted_amount: IDL.Nat64,
        block_index: IDL.Nat64,
        utxo: Utxo
    });
    const UtxoStatus = IDL.Variant({
        ValueTooSmall: Utxo,
        Tainted: Utxo,
        Minted: _InlineUtxoStatusMinted,
        Checked: Utxo
    });
    const _InlineUpdateBalanceErrorGenericError = IDL.Record({
        error_message: IDL.Text,
        error_code: IDL.Nat64
    });
    const _InlineUpdateBalanceErrorNoNewUtxos = IDL.Record({
        required_confirmations: IDL.Nat32,
        current_confirmations: IDL.Opt(IDL.Nat32)
    });
    const UpdateBalanceError = IDL.Variant({
        GenericError: _InlineUpdateBalanceErrorGenericError,
        TemporarilyUnavailable: IDL.Text,
        AlreadyProcessing: IDL.Null,
        NoNewUtxos: _InlineUpdateBalanceErrorNoNewUtxos
    });
    const ManualReply = IDL.Variant({
        Ok: IDL.Vec(UtxoStatus),
        Err: UpdateBalanceError
    });
    return IDL.Service({
        getBalance: IDL.Func([], [IDL.Nat64], []),
        getDepositAddress: IDL.Func([], [IDL.Text], []),
        updateBalance: IDL.Func([], [ManualReply], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
