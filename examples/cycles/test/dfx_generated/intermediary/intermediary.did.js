export const idlFactory = ({ IDL }) => {
    const SendCyclesResult = IDL.Variant({ ok: IDL.Nat64, err: IDL.Text });
    const SendCyclesResult128 = IDL.Variant({ ok: IDL.Nat, err: IDL.Text });
    const RejectionCode = IDL.Variant({
        NoError: IDL.Null,
        CanisterError: IDL.Null,
        SysTransient: IDL.Null,
        DestinationInvalid: IDL.Null,
        Unknown: IDL.Null,
        SysFatal: IDL.Null,
        CanisterReject: IDL.Null
    });
    const NotifyResult = IDL.Variant({ ok: IDL.Null, err: RejectionCode });
    return IDL.Service({
        get_canister_balance: IDL.Func([], [IDL.Nat64], ['query']),
        get_canister_balance128: IDL.Func([], [IDL.Nat], ['query']),
        send_cycles: IDL.Func([], [SendCyclesResult], []),
        send_cycles128: IDL.Func([], [SendCyclesResult128], []),
        send_cycles128_notify: IDL.Func([], [NotifyResult], []),
        send_cycles_notify: IDL.Func([], [NotifyResult], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
