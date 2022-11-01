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
    const SendNotificationResult = IDL.Variant({
        ok: IDL.Bool,
        err: RejectionCode
    });
    return IDL.Service({
        send_notification: IDL.Func([], [SendNotificationResult], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
