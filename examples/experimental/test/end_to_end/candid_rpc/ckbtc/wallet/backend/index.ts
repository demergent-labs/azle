// TODO maybe this should be Ledger? We should look into making the Ledger
// better using the latest Wasm and did that I know of

import { call, id, msgCaller, trap } from 'azle';
import {
    blob,
    Canister,
    nat,
    nat64,
    None,
    Principal,
    Result,
    serialize,
    Some,
    text,
    update
} from 'azle/experimental';
import { TransferError } from 'azle/experimental/canisters/icrc/icrc_1';

import { UpdateBalanceResult } from './minter';

export default Canister({
    getBalance: update([], nat64, async () => {
        if (process.env.AZLE_TEST_FETCH === 'true') {
            const response = await fetch(
                `icp://${getCkBtcPrincipal()}/icrc1_balance_of`,
                {
                    body: serialize({
                        candidPath: `/candid/icp/icrc.did`,
                        args: [
                            {
                                owner: id(),
                                subaccount: [
                                    padPrincipalWithZeros(
                                        msgCaller().toUint8Array()
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
            return await call(getCkBtcPrincipal(), 'icrc1_balance_of', {
                args: [
                    {
                        owner: id(),
                        subaccount: Some(
                            padPrincipalWithZeros(msgCaller().toUint8Array())
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
                                owner: [id()],
                                subaccount: [
                                    padPrincipalWithZeros(
                                        msgCaller().toUint8Array()
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
            return await call(getMinterPrincipal(), 'update_balance', {
                args: [
                    {
                        owner: Some(id()),
                        subaccount: Some(
                            padPrincipalWithZeros(msgCaller().toUint8Array())
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
                                owner: [id()],
                                subaccount: [
                                    padPrincipalWithZeros(
                                        msgCaller().toUint8Array()
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
            return await call(getMinterPrincipal(), 'get_btc_address', {
                args: [
                    {
                        owner: Some(id()),
                        subaccount: Some(
                            padPrincipalWithZeros(msgCaller().toUint8Array())
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
                            candidPath: `/candid/icp/icrc.did`,
                            args: [
                                {
                                    from_subaccount: [
                                        padPrincipalWithZeros(
                                            msgCaller().toUint8Array()
                                        )
                                    ],
                                    to: {
                                        owner: id(),
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
                return await call(getCkBtcPrincipal(), 'icrc1_transfer', {
                    args: [
                        {
                            from_subaccount: Some(
                                padPrincipalWithZeros(
                                    msgCaller().toUint8Array()
                                )
                            ),
                            to: {
                                owner: id(),
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

function getCkBtcPrincipal(): string {
    if (process.env.CK_BTC_PRINCIPAL !== undefined) {
        return process.env.CK_BTC_PRINCIPAL;
    }

    trap(`process.env.CK_BTC_PRINCIPAL is not defined`);
}

function getMinterPrincipal(): string {
    if (process.env.MINTER_PRINCIPAL !== undefined) {
        return process.env.MINTER_PRINCIPAL;
    }

    trap(`process.env.MINTER_PRINCIPAL is not defined`);
}
