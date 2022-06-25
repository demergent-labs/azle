export const idlFactory = ({ IDL }) => {
    const RejectionCode = IDL.Variant({
        NoError: IDL.Null,
        CanisterError: IDL.Null,
        SysTransient: IDL.Null,
        DestinationInvalid: IDL.Null,
        Unknown: IDL.Null,
        SysFatal: IDL.Null,
        CanisterReject: IDL.Null
    });
    const RejectCodeResult = IDL.Variant({
        ok: RejectionCode,
        err: IDL.Text
    });
    return IDL.Service({
        getRejectionCodeCanisterError: IDL.Func([], [RejectCodeResult], []),
        getRejectionCodeCanisterReject: IDL.Func(
            [IDL.Text],
            [RejectCodeResult],
            []
        ),
        getRejectionCodeDestinationInvalid: IDL.Func(
            [],
            [RejectCodeResult],
            []
        ),
        getRejectionCodeNoError: IDL.Func([], [RejectCodeResult], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
