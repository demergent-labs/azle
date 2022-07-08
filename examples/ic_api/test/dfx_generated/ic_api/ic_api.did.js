export const idlFactory = ({ IDL }) => {
    const ArgDataMultipleParamsResult = IDL.Record({
        int: IDL.Int8,
        string: IDL.Text,
        blob: IDL.Vec(IDL.Nat8),
        boolean: IDL.Bool
    });
    return IDL.Service({
        arg_data_multiple_params: IDL.Func(
            [IDL.Vec(IDL.Nat8), IDL.Int8, IDL.Bool, IDL.Text],
            [ArgDataMultipleParamsResult],
            ['query']
        ),
        arg_data_one_param: IDL.Func([IDL.Bool], [IDL.Bool], ['query']),
        arg_data_raw: IDL.Func(
            [IDL.Vec(IDL.Nat8), IDL.Int8, IDL.Bool, IDL.Text],
            [IDL.Vec(IDL.Nat8)],
            ['query']
        ),
        arg_data_raw_size: IDL.Func(
            [IDL.Vec(IDL.Nat8), IDL.Int8, IDL.Bool, IDL.Text],
            [IDL.Nat32],
            ['query']
        ),
        arg_data_zero_params: IDL.Func([], [IDL.Vec(IDL.Null)], ['query']),
        caller: IDL.Func([], [IDL.Principal], ['query']),
        canister_balance: IDL.Func([], [IDL.Nat64], ['query']),
        canister_balance128: IDL.Func([], [IDL.Nat], ['query']),
        data_certificate: IDL.Func([], [IDL.Opt(IDL.Vec(IDL.Nat8))], ['query']),
        data_certificate_null: IDL.Func([], [IDL.Opt(IDL.Vec(IDL.Nat8))], []),
        id: IDL.Func([], [IDL.Principal], ['query']),
        print: IDL.Func([IDL.Text], [IDL.Bool], ['query']),
        reject: IDL.Func([IDL.Text], [IDL.Empty], ['query']),
        set_certified_data: IDL.Func([IDL.Vec(IDL.Nat8)], [], []),
        time: IDL.Func([], [IDL.Nat64], ['query']),
        trap: IDL.Func([IDL.Text], [IDL.Bool], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
