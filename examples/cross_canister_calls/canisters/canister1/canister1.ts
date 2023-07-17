import {
    ic,
    nat64,
    NotifyResult,
    Opt,
    Principal,
    Result,
    $update,
    Vec
} from 'azle';
import { Account, AccountArgs, Canister2 } from '../canister2/types';

const canister2 = new Canister2(
    Principal.fromText(
        process.env.CANISTER2_PRINCIPAL ??
            ic.trap('process.env.CANISTER2_PRINCIPAL is undefined')
    )
);

$update;
export async function transfer(
    from: string,
    to: string,
    amount: nat64
): Promise<Result<nat64, string>> {
    return await canister2.transfer(from, to, amount).call();
}

$update;
export async function balance(id: string): Promise<Result<nat64, string>> {
    return await canister2.balance(id).call();
}

$update;
export async function account(
    args: AccountArgs
): Promise<Result<Opt<Account>, string>> {
    return await canister2.account(args).call();
}

$update;
export async function accounts(): Promise<Result<Vec<Account>, string>> {
    return await canister2.accounts().call();
}

$update;
export async function trap(): Promise<Result<string, string>> {
    return await canister2.trap().call();
}

$update;
export function sendNotification(): NotifyResult {
    return canister2.receiveNotification('This is the notification').notify();
}
