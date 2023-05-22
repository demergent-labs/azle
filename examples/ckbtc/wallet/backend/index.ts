// TODO don't forget to add transfer capabilities

import { ic, match, nat64, Opt, Principal, $update } from 'azle';
// TODO maybe this should be Ledger? We should look into making the Ledger better using the latest Wasm and did that I know of
import { ICRC } from 'azle/canisters/icrc';

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
            owner: ic.caller(),
            subaccount: Opt.None
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
            owner: Opt.Some(ic.caller()),
            subaccount: Opt.None
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
            owner: Opt.Some(ic.caller()),
            subaccount: Opt.None
        })
        .call();

    return match(result, {
        Ok: (ok) => ok,
        Err: (err) => ic.trap(err)
    });
}
