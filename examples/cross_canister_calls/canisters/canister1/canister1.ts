import { nat64, NotifyResult, Opt, Principal, $update, Variant } from 'azle';
import { Account, AccountArgs, Canister2 } from '../canister2/types';

type TransferResult = Variant<{
    ok: nat64;
    err: string;
}>;

type BalanceResult = Variant<{
    ok: nat64;
    err: string;
}>;

type AccountResult = Variant<{
    ok: Opt<Account>;
    err: string;
}>;

type AccountsResult = Variant<{
    ok: Account[];
    err: string;
}>;

type TrapResult = Variant<{
    ok: string;
    err: string;
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
export function send_notification(): NotifyResult {
    return canister2.receive_notification('This is the notification').notify();
}
