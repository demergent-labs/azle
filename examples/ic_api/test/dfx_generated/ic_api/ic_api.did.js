export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'caller' : IDL.Func([], [IDL.Text], ['query']),
    'canisterBalance' : IDL.Func([], [IDL.Nat64], ['query']),
    'id' : IDL.Func([], [IDL.Principal], ['query']),
    'print' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'time' : IDL.Func([], [IDL.Nat64], ['query']),
    'trap' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
