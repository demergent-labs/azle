export const idlFactory = ({ IDL }) => {
    return IDL.Service({
        caller: IDL.Func([], [IDL.Principal], ['query']),
        canister_balance: IDL.Func([], [IDL.Nat64], ['query']),
        canister_balance128: IDL.Func([], [IDL.Nat], ['query']),
        data_certificate: IDL.Func([], [IDL.Opt(IDL.Vec(IDL.Nat8))], ['query']),
        data_certificate_null: IDL.Func([], [IDL.Opt(IDL.Vec(IDL.Nat8))], []),
        id: IDL.Func([], [IDL.Principal], ['query']),
        print: IDL.Func([IDL.Text], [IDL.Bool], ['query']),
        reject: IDL.Func([IDL.Text], [IDL.Empty], ['query']),
        time: IDL.Func([], [IDL.Nat64], ['query']),
        trap: IDL.Func([IDL.Text], [IDL.Bool], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
