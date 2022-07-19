export const idlFactory = ({ IDL }) => {
    const SendCyclesResult = IDL.Variant({ ok: IDL.Nat64, err: IDL.Text });
    const SendCyclesResult128 = IDL.Variant({ ok: IDL.Nat, err: IDL.Text });
    const NotifyResult = IDL.Variant({ ok: IDL.Null, err: IDL.Text });
    return IDL.Service({
        getCanisterBalance: IDL.Func([], [IDL.Nat64], ['query']),
        getCanisterBalance128: IDL.Func([], [IDL.Nat], ['query']),
        sendCycles: IDL.Func([], [SendCyclesResult], []),
        sendCycles128: IDL.Func([], [SendCyclesResult128], []),
        sendCycles128Notify: IDL.Func([], [NotifyResult], []),
        sendCyclesNotify: IDL.Func([], [NotifyResult], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
