import { nat64, NotifyResult, Opt, Principal, $update, Variant } from 'azle';
import { Account, AccountArgs, Canister2 } from '../canister2/types';

type TransferResult = Variant<{
    Ok: nat64;
    Err: string;
}>;

type BalanceResult = Variant<{
    Ok: nat64;
    Err: string;
}>;

type AccountResult = Variant<{
    Ok: Opt<Account>;
    Err: string;
}>;

type AccountsResult = Variant<{
    Ok: Account[];
    Err: string;
}>;

type TrapResult = Variant<{
    Ok: string;
    Err: string;
}>;

const canister2 = new Canister2(
    Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
);

$update;
export async function transfer(
    from: string,
    to: string,
    amount: nat64
): Promise<TransferResult> {
    return await canister2.transfer(from, to, amount).call();
}

$update;
export async function balance(id: string): Promise<BalanceResult> {
    return await canister2.balance(id).call();
}

$update;
export async function account(args: AccountArgs): Promise<AccountResult> {
    return await canister2.account(args).call();
}

$update;
export async function accounts(): Promise<AccountsResult> {
    return await canister2.accounts().call();
}

$update;
export async function trap(): Promise<TrapResult> {
    return await canister2.trap().call();
}

$update;
export function sendNotification(): NotifyResult {
    return canister2.receiveNotification('This is the notification').notify();
}
