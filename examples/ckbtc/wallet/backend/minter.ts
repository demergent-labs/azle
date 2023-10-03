import {
    Canister,
    Null,
    Opt,
    Principal,
    Record,
    Result,
    Variant,
    Vec,
    blob,
    nat32,
    nat64,
    nat8,
    text,
    update
} from 'azle';

const Utxo = Record({
    outpoint: Record({ txid: Vec(nat8), vout: nat32 }),
    value: nat64,
    height: nat32
});

// The result of an [update_balance] call.
const UtxoStatus = Variant({
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
    Minted: Record({
        block_index: nat64,
        minted_amount: nat64,
        utxo: Utxo
    })
});

const UpdateBalanceError = Variant({
    // There are no new UTXOs to process.
    NoNewUtxos: Record({
        current_confirmations: Opt(nat32),
        required_confirmations: nat32
    }),
    // The minter is already processing another update balance request for the caller.
    AlreadyProcessing: Null,
    // The minter is overloaded, retry the request.
    // The payload contains a human-readable message explaining what caused the unavailability.
    TemporarilyUnavailable: text,
    // A generic error reserved for future extensions.
    GenericError: Record({ error_message: text, error_code: nat64 })
});

export const UpdateBalanceResult = Result(Vec(UtxoStatus), UpdateBalanceError);

export const Minter = Canister({
    get_btc_address: update(
        [
            Record({
                owner: Opt(Principal),
                subaccount: Opt(blob)
            })
        ],
        text
    ),

    update_balance: update(
        [
            Record({
                owner: Opt(Principal),
                subaccount: Opt(blob)
            })
        ],
        UpdateBalanceResult
    )
});
