import { Update, ic, nat64, NotifyResult, Opt, Principal, Variant } from 'azle';
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

let canister2 = ic.canisters.Canister2<Canister2>(
    Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
);

export async function transfer(
    from: string,
    to: string,
    amount: nat64
): Promise<Update<TransferResult>> {
    return await canister2.transfer(from, to, amount).call();
}

export async function balance(id: string): Promise<Update<BalanceResult>> {
    return await canister2.balance(id).call();
}

export async function account(
    args: AccountArgs
): Promise<Update<AccountResult>> {
    return await canister2.account(args).call();
}

export async function accounts(): Promise<Update<AccountsResult>> {
    return await canister2.accounts().call();
}

export async function trap(): Promise<Update<TrapResult>> {
    return await canister2.trap().call();
}

export function send_notification(): Update<NotifyResult> {
    return canister2.receive_notification('This is the notification').notify();
}
