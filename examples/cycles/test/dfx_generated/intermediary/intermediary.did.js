export const idlFactory = ({ IDL }) => {
    const ReportRefundResult = IDL.Variant({
        ok: IDL.Nat64,
        err: IDL.Text
    });
    const ReportRefundResult128 = IDL.Variant({
        ok: IDL.Nat,
        err: IDL.Text
    });
    return IDL.Service({
        reportRefund: IDL.Func([], [ReportRefundResult], []),
        reportRefund128: IDL.Func([], [ReportRefundResult128], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
