import { Update, ic, nat64, Opt, Principal, Variant } from 'azle';
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

type NotifyResult = Variant<{
    ok: null;
    err: string;
}>;

let canister2 = ic.canisters.Canister2<Canister2>(
    Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
);

export function* transfer(
    from: string,
    to: string,
    amount: nat64
): Update<TransferResult> {
    return yield canister2.transfer(from, to, amount);
}

export function* balance(id: string): Update<BalanceResult> {
    return yield canister2.balance(id);
}

export function* account(args: AccountArgs): Update<AccountResult> {
    return yield canister2.account(args);
}

export function* accounts(): Update<AccountsResult> {
    return yield canister2.accounts();
}

export function* trap(): Update<TrapResult> {
    return yield canister2.trap();
}

export function send_notification(): Update<NotifyResult> {
    return canister2.receive_notification('This is the notification').notify();
}
