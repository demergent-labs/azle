// TODO maybe this should be Ledger? We should look into making the Ledger better using the latest Wasm and did that I know of

import {
    blob,
    ic,
    match,
    nat,
    nat64,
    Opt,
    Principal,
    $update,
    Variant
} from 'azle';
import { ICRC, ICRC1TransferError } from 'azle/canisters/icrc';

import { Minter, UpdateBalanceResult } from './minter';

const ckBTC = new ICRC(
    Principal.fromText(
        process.env.CK_BTC_PRINCIPAL ??
            ic.trap('process.env.CK_BTC_PRINCIPAL is undefined')
    )
);

const minter = new Minter(
    Principal.fromText(
        process.env.MINTER_PRINCIPAL ??
            ic.trap('process.env.MINTER_PRINCIPAL is undefined')
    )
);

$update;
export async function getBalance(): Promise<nat64> {
    const result = await ckBTC
        .icrc1_balance_of({
            owner: ic.id(),
            subaccount: Opt.Some(
                padPrincipalWithZeros(ic.caller().toUint8Array())
            )
        })
        .call();

    return match(result, {
        Ok: (ok) => ok,
        Err: (err) => ic.trap(err)
    });
}

$update;
export async function updateBalance(): Promise<UpdateBalanceResult> {
    const result = await minter
        .update_balance({
            owner: Opt.Some(ic.id()),
            subaccount: Opt.Some(
                padPrincipalWithZeros(ic.caller().toUint8Array())
            )
        })
        .call();

    return match(result, {
        Ok: (ok) => ok,
        Err: (err) => ic.trap(err)
    });
}

$update;
export async function getDepositAddress(): Promise<string> {
    const result = await minter
        .get_btc_address({
            owner: Opt.Some(ic.id()),
            subaccount: Opt.Some(
                padPrincipalWithZeros(ic.caller().toUint8Array())
            )
        })
        .call();

    return match(result, {
        Ok: (ok) => ok,
        Err: (err) => ic.trap(err)
    });
}

$update;
export async function transfer(
    to: string,
    amount: nat
): Promise<Variant<{ Ok: nat; Err: ICRC1TransferError }>> {
    const result = await ckBTC
        .icrc1_transfer({
            from_subaccount: Opt.Some(
                padPrincipalWithZeros(ic.caller().toUint8Array())
            ),
            to: {
                owner: ic.id(),
                subaccount: Opt.Some(
                    padPrincipalWithZeros(Principal.fromText(to).toUint8Array())
                )
            },
            amount,
            fee: Opt.None,
            memo: Opt.None,
            created_at_time: Opt.None
        })
        .call();

    return match(result, {
        Ok: (ok) => ok,
        Err: (err) => ic.trap(err)
    });
}

function padPrincipalWithZeros(blob: blob): blob {
    let newUin8Array = new Uint8Array(32);
    newUin8Array.set(blob);
    return newUin8Array;
}
