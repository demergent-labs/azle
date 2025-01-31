// TODO maybe this should be Ledger? We should look into making the Ledger
// better using the latest Wasm and did that I know of

import { call, canisterSelf, IDL, msgCaller } from 'azle';
import { Account, TransferArgs, TransferResult } from 'azle/canisters/icrc_1';
import {
    blob,
    Canister,
    nat,
    nat64,
    Principal,
    serialize,
    text,
    update
} from 'azle/experimental';
import { TransferResult as TransferResultExperimental } from 'azle/experimental/canisters/icrc';

import { UpdateBalanceResult as UpdateBalanceResultExperimental } from './minter';

const AccountArg = IDL.Record({
    owner: IDL.Opt(IDL.Principal),
    subaccount: IDL.Opt(IDL.Vec(IDL.Nat8))
});
type AccountArg = {
    owner: [Principal] | [];
    subaccount: [Uint8Array] | [];
};

const Utxo = IDL.Record({
    outpoint: IDL.Record({ txid: IDL.Vec(IDL.Nat8), vout: IDL.Nat32 }),
    value: IDL.Nat64,
    height: IDL.Nat32
});
type Utxo = {
    outpoint: { txid: Uint8Array; vout: number };
    value: bigint;
    height: number;
};

const UtxoStatus = IDL.Variant({
    ValueTooSmall: Utxo,
    Tainted: Utxo,
    Checked: Utxo,
    Minted: IDL.Record({
        block_index: IDL.Nat64,
        minted_amount: IDL.Nat64,
        utxo: Utxo
    })
});
type UtxoStatus =
    | { ValueTooSmall: Utxo }
    | { Tainted: Utxo }
    | { Checked: Utxo }
    | { Minted: { block_index: bigint; minted_amount: bigint; utxo: Utxo } };

const UpdateBalanceError = IDL.Variant({
    NoNewUtxos: IDL.Record({
        current_confirmations: IDL.Opt(IDL.Nat32),
        required_confirmations: IDL.Nat32
    }),
    AlreadyProcessing: IDL.Null,
    TemporarilyUnavailable: IDL.Text,
    GenericError: IDL.Record({ error_message: IDL.Text, error_code: IDL.Nat64 })
});
type UpdateBalanceError =
    | {
          NoNewUtxos: {
              current_confirmations: [number] | [];
              required_confirmations: number;
          };
      }
    | { AlreadyProcessing: null }
    | { TemporarilyUnavailable: string }
    | { GenericError: { error_message: string; error_code: bigint } };

const UpdateBalanceResult = IDL.Variant({
    Ok: IDL.Vec(UtxoStatus),
    Err: UpdateBalanceError
});
type UpdateBalanceResult = { Ok: UtxoStatus[] } | { Err: UpdateBalanceError };

export default Canister({
    getBalance: update([], nat64, async () => {
        const arg: Account = {
            owner: canisterSelf(),
            subaccount: [padPrincipalWithZeros(msgCaller().toUint8Array())]
        };

        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getCkBtcPrincipal()}/icrc1_balance_of`,
                {
                    body: serialize({
                        candidPath: `/candid/icp/icrc.did`,
                        args: [arg]
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await call<[Account], nat>(
                getCkBtcPrincipal(),
                'icrc1_balance_of',
                {
                    paramIdlTypes: [Account],
                    returnIdlType: nat.getIdlType(),
                    args: [arg]
                }
            );
        }
    }),
    updateBalance: update([], UpdateBalanceResultExperimental, async () => {
        const arg: AccountArg = {
            owner: [canisterSelf()],
            subaccount: [padPrincipalWithZeros(msgCaller().toUint8Array())]
        };

        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getMinterPrincipal()}/update_balance`,
                {
                    body: serialize({
                        candidPath: `/minter/minter.did`,
                        args: [arg]
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await call<[AccountArg], UpdateBalanceResult>(
                getMinterPrincipal(),
                'update_balance',
                {
                    paramIdlTypes: [AccountArg],
                    returnIdlType: UpdateBalanceResult,
                    args: [arg]
                }
            );
        }
    }),
    getDepositAddress: update([], text, async () => {
        const arg: AccountArg = {
            owner: [canisterSelf()],
            subaccount: [padPrincipalWithZeros(msgCaller().toUint8Array())]
        };

        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getMinterPrincipal()}/get_btc_address`,
                {
                    body: serialize({
                        candidPath: `/minter/minter.did`,
                        args: [arg]
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await call<[AccountArg], text>(
                getMinterPrincipal(),
                'get_btc_address',
                {
                    paramIdlTypes: [AccountArg],
                    returnIdlType: text.getIdlType(),
                    args: [arg]
                }
            );
        }
    }),
    transfer: update(
        [text, nat],
        TransferResultExperimental,
        async (to, amount) => {
            const arg: TransferArgs = {
                from_subaccount: [
                    padPrincipalWithZeros(msgCaller().toUint8Array())
                ],
                to: {
                    owner: canisterSelf(),
                    subaccount: [
                        padPrincipalWithZeros(
                            Principal.fromText(to).toUint8Array()
                        )
                    ]
                },
                amount,
                fee: [],
                memo: [],
                created_at_time: []
            };

            if (process.env.AZLE_TEST_FETCH === 'true') {
                const response = await fetch(
                    `icp://${getCkBtcPrincipal()}/icrc1_transfer`,
                    {
                        body: serialize({
                            candidPath: `/candid/icp/icrc.did`,
                            args: [arg]
                        })
                    }
                );
                const responseJson = await response.json();

                return responseJson;
            } else {
                return await call<[TransferArgs], TransferResult>(
                    getCkBtcPrincipal(),
                    'icrc1_transfer',
                    {
                        paramIdlTypes: [TransferArgs],
                        returnIdlType: TransferResult,
                        args: [arg]
                    }
                );
            }
        }
    )
});

function padPrincipalWithZeros(blob: blob): blob {
    let newUin8Array = new Uint8Array(32);
    newUin8Array.set(blob);
    return newUin8Array;
}

function getCkBtcPrincipal(): string {
    if (process.env.CK_BTC_PRINCIPAL !== undefined) {
        return process.env.CK_BTC_PRINCIPAL;
    }

    throw new Error(`process.env.CK_BTC_PRINCIPAL is not defined`);
}

function getMinterPrincipal(): string {
    if (process.env.MINTER_PRINCIPAL !== undefined) {
        return process.env.MINTER_PRINCIPAL;
    }

    throw new Error(`process.env.MINTER_PRINCIPAL is not defined`);
}
