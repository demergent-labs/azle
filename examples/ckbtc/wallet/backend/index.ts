// TODO maybe this should be Ledger? We should look into making the Ledger
// better using the latest Wasm and did that I know of

import { call, caller, id, IDL, Principal, update } from 'azle';
import { Account, TransferArgs, TransferResult } from 'azle/canisters/icrc_1';

import {
    GetBtcAddressArgs,
    UpdateBalanceArgs,
    UpdateBalanceResult
} from './minter';
// TODO I don't know if we need the minter or ckbtc or icrc canisters anymore?

export default class {
    @update([], IDL.Nat64)
    async getBalance(): Promise<bigint> {
        return await call(getCkBtcPrincipal(), 'icrc1_balance_of', {
            paramIdlTypes: [Account],
            returnIdlType: IDL.Nat,
            args: [
                {
                    owner: id(),
                    subaccount: [padPrincipalWithZeros(caller().toUint8Array())]
                }
            ]
        });
    }

    @update([], UpdateBalanceResult)
    async updateBalance(): Promise<UpdateBalanceResult> {
        const updateBalanceResult: UpdateBalanceResult = await call(
            getMinterPrincipal(),
            'update_balance',
            {
                paramIdlTypes: [UpdateBalanceArgs],
                returnIdlType: UpdateBalanceResult,
                args: [
                    {
                        owner: [id()],
                        subaccount: [
                            padPrincipalWithZeros(caller().toUint8Array())
                        ]
                    }
                ]
            }
        );

        return updateBalanceResult;
    }

    @update([], IDL.Text)
    async getDepositAddress(): Promise<string> {
        return await call(getMinterPrincipal(), 'get_btc_address', {
            paramIdlTypes: [GetBtcAddressArgs],
            returnIdlType: IDL.Text,
            args: [
                {
                    owner: [id()],
                    subaccount: [padPrincipalWithZeros(caller().toUint8Array())]
                }
            ]
        });
    }

    // TODO get rid of Result
    @update([IDL.Text, IDL.Nat], TransferResult)
    async transfer(to: string, amount: bigint): Promise<TransferResult> {
        return await call(getCkBtcPrincipal(), 'icrc1_transfer', {
            paramIdlTypes: [TransferArgs],
            returnIdlType: TransferResult,
            args: [
                {
                    from_subaccount: [
                        padPrincipalWithZeros(caller().toUint8Array())
                    ],
                    to: {
                        owner: id(),
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
                }
            ]
        });
    }
}

function padPrincipalWithZeros(blob: Uint8Array): Uint8Array {
    let newUin8Array = new Uint8Array(32);
    newUin8Array.set(blob);
    return newUin8Array;
}

function getCkBtcPrincipal(): string {
    if (process.env.CK_BTC_PRINCIPAL !== undefined) {
        console.info(process.env.CK_BTC_PRINCIPAL);
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
