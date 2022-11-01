export const idlFactory = ({ IDL }) => {
    return IDL.Service({
        balance: IDL.Func([IDL.Text], [IDL.Nat64], ['query']),
        initialize_supply: IDL.Func(
            [IDL.Text, IDL.Text, IDL.Text, IDL.Nat64],
            [IDL.Bool],
            []
        ),
        name: IDL.Func([], [IDL.Text], ['query']),
        ticker: IDL.Func([], [IDL.Text], ['query']),
        total_supply: IDL.Func([], [IDL.Nat64], ['query']),
        transfer: IDL.Func([IDL.Text, IDL.Text, IDL.Nat64], [IDL.Bool], [])
    });
};
export const init = ({ IDL }) => {
    return [];
};
