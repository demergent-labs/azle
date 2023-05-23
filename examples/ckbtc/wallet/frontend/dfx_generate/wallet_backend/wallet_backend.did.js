export const idlFactory = ({ IDL }) => {
    const _InlineICRCTransferErrorGenericError = IDL.Record({
        message: IDL.Text,
        error_code: IDL.Nat
    });
    const _InlineICRCTransferErrorBadBurn = IDL.Record({
        min_burn_amount: IDL.Nat
    });
    const _InlineICRCTransferErrorDuplicate = IDL.Record({
        duplicate_of: IDL.Nat
    });
    const _InlineICRCTransferErrorBadFee = IDL.Record({
        expected_fee: IDL.Nat
    });
    const _InlineICRCTransferErrorCreatedInFuture = IDL.Record({
        ledger_time: IDL.Nat64
    });
    const _InlineICRCTransferErrorInsufficientFunds = IDL.Record({
        balance: IDL.Nat
    });
    const ICRCTransferError = IDL.Variant({
        GenericError: _InlineICRCTransferErrorGenericError,
        TemporarilyUnavailable: IDL.Null,
        BadBurn: _InlineICRCTransferErrorBadBurn,
        Duplicate: _InlineICRCTransferErrorDuplicate,
        BadFee: _InlineICRCTransferErrorBadFee,
        CreatedInFuture: _InlineICRCTransferErrorCreatedInFuture,
        TooOld: IDL.Null,
        InsufficientFunds: _InlineICRCTransferErrorInsufficientFunds
    });
    const ManualReply = IDL.Variant({
        Ok: IDL.Nat,
        Err: ICRCTransferError
    });
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
    const ManualReply_1 = IDL.Variant({
        Ok: IDL.Vec(UtxoStatus),
        Err: UpdateBalanceError
    });
    return IDL.Service({
        getBalance: IDL.Func([], [IDL.Nat64], []),
        getDepositAddress: IDL.Func([], [IDL.Text], []),
        transfer: IDL.Func([IDL.Text, IDL.Nat], [ManualReply], []),
        updateBalance: IDL.Func([], [ManualReply_1], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
