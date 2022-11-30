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
        get_rejection_code_canister_error: IDL.Func([], [RejectionCode], []),
        get_rejection_code_canister_reject: IDL.Func([], [RejectionCode], []),
        get_rejection_code_destination_invalid: IDL.Func(
            [],
            [RejectionCode],
            []
        ),
        get_rejection_code_no_error: IDL.Func([], [RejectionCode], []),
        get_rejection_message: IDL.Func([IDL.Text], [IDL.Text], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
