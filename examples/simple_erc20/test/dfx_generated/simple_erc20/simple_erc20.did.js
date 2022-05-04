export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'balance' : IDL.Func([IDL.Text], [IDL.Nat64], ['query']),
    'initializeSupply' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat64, IDL.Text],
        [IDL.Bool],
        [],
      ),
    'name' : IDL.Func([], [IDL.Text], ['query']),
    'ticker' : IDL.Func([], [IDL.Text], ['query']),
    'totalSupply' : IDL.Func([], [IDL.Nat64], ['query']),
    'transfer' : IDL.Func([IDL.Text, IDL.Text, IDL.Nat64], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
