export const idlFactory = ({ IDL }) => {
    const SendNotificationResult = IDL.Variant({
        ok: IDL.Bool,
        err: IDL.Text
    });
    return IDL.Service({
        send_notification: IDL.Func([], [SendNotificationResult], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
