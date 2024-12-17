import { IDL } from 'azle';

import {
    UpdateBalanceError,
    UtxoStatus
} from '../frontend/wallet/frontend/dfx_generate/wallet_backend/wallet_backend.did';

const Utxo = IDL.Record({
    outpoint: IDL.Record({ txid: IDL.Vec(IDL.Nat8), vout: IDL.Nat32 }),
    value: IDL.Nat64,
    height: IDL.Nat32
});

// The result of an [update_balance] call.
const UtxoStatus = IDL.Variant({
    // The minter ignored this UTXO because UTXO's value is too small to pay
    // the KYT fees. This state is final, retrying [update_balance] call will
    // have no effect on this UTXO.
    ValueTooSmall: Utxo,
    // The KYT provider considered this UTXO to be tained. This UTXO state is
    // final, retrying [update_balance] call will have no effect on this UTXO.
    Tainted: Utxo,
    // The UTXO passed the KYT check, but the minter failed to mint ckBTC
    // because the Ledger was unavailable. Retrying the [update_balance] call
    // should eventually advance the UTXO to the [Minted] state.
    Checked: Utxo,
    // The UTXO passed the KYT check, and ckBTC has been minted.
    Minted: IDL.Record({
        block_index: IDL.Nat64,
        minted_amount: IDL.Nat64,
        utxo: Utxo
    })
});

const UpdateBalanceError = IDL.Variant({
    // There are no new UTXOs to process.
    NoNewUtxos: IDL.Record({
        current_confirmations: IDL.Opt(IDL.Nat32),
        required_confirmations: IDL.Nat32
    }),
    // The minter is already processing another update balance request for the caller.
    AlreadyProcessing: IDL.Null,
    // The minter is overloaded, retry the request.
    // The payload contains a human-readable message explaining what caused the unavailability.
    TemporarilyUnavailable: IDL.Text,
    // A generic error reserved for future extensions.
    GenericError: IDL.Record({ error_message: IDL.Text, error_code: IDL.Nat64 })
});

export const UpdateBalanceResult = IDL.Variant({
    Ok: IDL.Vec(UtxoStatus),
    Err: UpdateBalanceError
});
export type UpdateBalanceResult =
    | { Ok: UtxoStatus[] }
    | { Err: UpdateBalanceError };

export const GetBtcAddressArgs = IDL.Record({
    owner: IDL.Opt(IDL.Principal),
    subaccount: IDL.Opt(IDL.Vec(IDL.Nat8))
});

export const UpdateBalanceArgs = IDL.Record({
    owner: IDL.Opt(IDL.Principal),
    subaccount: IDL.Opt(IDL.Vec(IDL.Nat8))
});

export const Minter = IDL.Service({
    get_btc_address: IDL.Func([GetBtcAddressArgs], [IDL.Text]),

    update_balance: IDL.Func([UpdateBalanceArgs], [UpdateBalanceResult])
});
