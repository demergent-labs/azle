export const idlFactory = ({ IDL }) => {
    const AccountArgs = IDL.Record({ id: IDL.Text });
    const Account = IDL.Record({ id: IDL.Text, balance: IDL.Nat64 });
    const AccountResult = IDL.Variant({
        ok: IDL.Opt(Account),
        err: IDL.Text
    });
    const AccountsResult = IDL.Variant({
        ok: IDL.Vec(Account),
        err: IDL.Text
    });
    const BalanceResult = IDL.Variant({ ok: IDL.Nat64, err: IDL.Text });
    const NotifyResult = IDL.Variant({ ok: IDL.Null, err: IDL.Text });
    const TransferResult = IDL.Variant({ ok: IDL.Nat64, err: IDL.Text });
    const TrapResult = IDL.Variant({ ok: IDL.Text, err: IDL.Text });
    return IDL.Service({
        account: IDL.Func([AccountArgs], [AccountResult], []),
        accounts: IDL.Func([], [AccountsResult], []),
        balance: IDL.Func([IDL.Text], [BalanceResult], []),
        send_notification: IDL.Func([], [NotifyResult], []),
        transfer: IDL.Func(
            [IDL.Text, IDL.Text, IDL.Nat64],
            [TransferResult],
            []
        ),
        trap: IDL.Func([], [TrapResult], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
