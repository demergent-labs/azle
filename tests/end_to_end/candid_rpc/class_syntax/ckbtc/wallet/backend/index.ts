// TODO maybe this should be Ledger? We should look into making the Ledger
// better using the latest Wasm and did that I know of

import { IDL, query, update } from 'azle';
import { ICRC } from 'azle/canisters/icrc';
import { TransferError } from 'azle/canisters/icrc/icrc_1';

import { Minter, UpdateBalanceResult } from './minter';

let ckBTC: typeof ICRC;

let minter: typeof Minter;

export default class {
    @init()
    init() {
        setupCanisters();
    }
    @postUpgrade()
    postUpgrade() {
        setupCanisters();
    }
    @update([], IDL.Nat64)
    async getBalance() {
        return await call(ckBTC.icrc1_balance_of, {
            args: [
                {
                    owner: ic.id(),
                    subaccount: Some(
                        padPrincipalWithZeros(caller().toUint8Array())
                    )
                }
            ]
        });
    }
    @update([], UpdateBalanceResult)
    async updateBalance() {
        return await call(minter.update_balance, {
            args: [
                {
                    owner: Some(ic.id()),
                    subaccount: Some(
                        padPrincipalWithZeros(caller().toUint8Array())
                    )
                }
            ]
        });
    }
    @update([], IDL.Text)
    async getDepositAddress() {
        return await call(minter.get_btc_address, {
            args: [
                {
                    owner: Some(ic.id()),
                    subaccount: Some(
                        padPrincipalWithZeros(caller().toUint8Array())
                    )
                }
            ]
        });
    }
    @update([IDL.Text, IDL.Nat], Result(IDL.Nat, TransferError))
    async transfer(to, amount) {
        return await call(ckBTC.icrc1_transfer, {
            args: [
                {
                    from_subaccount: Some(
                        padPrincipalWithZeros(caller().toUint8Array())
                    ),
                    to: {
                        owner: ic.id(),
                        subaccount: Some(
                            padPrincipalWithZeros(
                                Principal.fromText(to).toUint8Array()
                            )
                        )
                    },
                    amount,
                    fee: None,
                    memo: None,
                    created_at_time: None
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

function setupCanisters() {
    ckBTC = ICRC(
        Principal.fromText(
            process.env.CK_BTC_PRINCIPAL ??
                ic.trap('process.env.CK_BTC_PRINCIPAL is undefined')
        )
    );

    minter = Minter(
        Principal.fromText(
            process.env.MINTER_PRINCIPAL ??
                ic.trap('process.env.MINTER_PRINCIPAL is undefined')
        )
    );
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
