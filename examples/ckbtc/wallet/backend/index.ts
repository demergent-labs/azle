// TODO maybe this should be Ledger? We should look into making the Ledger
// better using the latest Wasm and did that I know of

import {
    Canister,
    None,
    Principal,
    Result,
    Some,
    blob,
    ic,
    init,
    nat,
    nat64,
    postUpgrade,
    serialize,
    text,
    update
} from 'azle';
import { ICRC } from 'azle/canisters/icrc';
import { TransferError } from 'azle/canisters/icrc/icrc_1';

import { Minter, UpdateBalanceResult } from './minter';

let ckBTC: typeof ICRC;

let minter: typeof Minter;

export default Canister({
    init: init([], setupCanisters),
    postUpgrade: postUpgrade([], setupCanisters),
    getBalance: update([], nat64, async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getCkBtcPrincipal()}/icrc1_balance_of`,
                {
                    body: serialize({
                        candidPath: `/candid/icrc.did`,
                        args: [
                            {
                                owner: ic.id(),
                                subaccount: [
                                    padPrincipalWithZeros(
                                        ic.caller().toUint8Array()
                                    )
                                ]
                            }
                        ]
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await ic.call(ckBTC.icrc1_balance_of, {
                args: [
                    {
                        owner: ic.id(),
                        subaccount: Some(
                            padPrincipalWithZeros(ic.caller().toUint8Array())
                        )
                    }
                ]
            });
        }
    }),
    updateBalance: update([], UpdateBalanceResult, async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getMinterPrincipal()}/update_balance`,
                {
                    body: serialize({
                        candidPath: `/minter/minter.did`,
                        args: [
                            {
                                owner: [ic.id()],
                                subaccount: [
                                    padPrincipalWithZeros(
                                        ic.caller().toUint8Array()
                                    )
                                ]
                            }
                        ]
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await ic.call(minter.update_balance, {
                args: [
                    {
                        owner: Some(ic.id()),
                        subaccount: Some(
                            padPrincipalWithZeros(ic.caller().toUint8Array())
                        )
                    }
                ]
            });
        }
    }),
    getDepositAddress: update([], text, async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getMinterPrincipal()}/get_btc_address`,
                {
                    body: serialize({
                        candidPath: `/minter/minter.did`,
                        args: [
                            {
                                owner: [ic.id()],
                                subaccount: [
                                    padPrincipalWithZeros(
                                        ic.caller().toUint8Array()
                                    )
                                ]
                            }
                        ]
                    })
                }
            );
            const responseJson = await response.json();

            return responseJson;
        } else {
            return await ic.call(minter.get_btc_address, {
                args: [
                    {
                        owner: Some(ic.id()),
                        subaccount: Some(
                            padPrincipalWithZeros(ic.caller().toUint8Array())
                        )
                    }
                ]
            });
        }
    }),
    transfer: update(
        [text, nat],
        Result(nat, TransferError),
        async (to, amount) => {
            if (process.env.AZLE_TEST_FETCH === 'true') {
                const response = await fetch(
                    `icp://${getCkBtcPrincipal()}/icrc1_transfer`,
                    {
                        body: serialize({
                            candidPath: `/candid/icrc.did`,
                            args: [
                                {
                                    from_subaccount: [
                                        padPrincipalWithZeros(
                                            ic.caller().toUint8Array()
                                        )
                                    ],
                                    to: {
                                        owner: ic.id(),
                                        subaccount: [
                                            padPrincipalWithZeros(
                                                Principal.fromText(
                                                    to
                                                ).toUint8Array()
                                            )
                                        ]
                                    },
                                    amount,
                                    fee: [],
                                    memo: [],
                                    created_at_time: []
                                }
                            ]
                        })
                    }
                );
                const responseJson = await response.json();

                return responseJson;
            } else {
                return await ic.call(ckBTC.icrc1_transfer, {
                    args: [
                        {
                            from_subaccount: Some(
                                padPrincipalWithZeros(
                                    ic.caller().toUint8Array()
                                )
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
    )
});

function padPrincipalWithZeros(blob: blob): blob {
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
