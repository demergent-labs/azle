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
    return IDL.Service({
        getRejectionCodeCanisterError: IDL.Func([], [RejectionCode], []),
        getRejectionCodeCanisterReject: IDL.Func([], [RejectionCode], []),
        getRejectionCodeDestinationInvalid: IDL.Func([], [RejectionCode], []),
        getRejectionCodeNoError: IDL.Func([], [RejectionCode], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
