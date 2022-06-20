export const idlFactory = ({ IDL }) => {
    const User = IDL.Record({ id: IDL.Principal, username: IDL.Text });
    const Status = IDL.Variant({
        Online: IDL.Null,
        WaitingOn: IDL.Principal,
        Offline: IDL.Null
    });
    return IDL.Service({
        principal_from_hex: IDL.Func([IDL.Text], [IDL.Principal], ['query']),
        principal_from_text: IDL.Func([IDL.Text], [IDL.Principal], ['query']),
        principal_from_uint8array: IDL.Func(
            [IDL.Vec(IDL.Nat8)],
            [IDL.Principal],
            ['query']
        ),
        principal_in_record: IDL.Func([], [User], ['query']),
        principal_in_variant: IDL.Func([], [Status], ['query']),
        principal_param: IDL.Func([IDL.Principal], [IDL.Principal], ['query']),
        principal_return_type: IDL.Func([], [IDL.Principal], ['query']),
        principal_to_hex: IDL.Func([IDL.Principal], [IDL.Text], ['query']),
        principal_to_text: IDL.Func([IDL.Principal], [IDL.Text], ['query']),
        principal_to_uint8array: IDL.Func(
            [IDL.Principal],
            [IDL.Vec(IDL.Nat8)],
            ['query']
        )
    });
};
export const init = ({ IDL }) => {
    return [];
};
