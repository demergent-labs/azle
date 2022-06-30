export const idlFactory = ({ IDL }) => {
  const AccountArgs = IDL.Record({ 'id' : IDL.Text });
  const Account = IDL.Record({ 'id' : IDL.Text, 'balance' : IDL.Nat64 });
  return IDL.Service({
    'account' : IDL.Func([AccountArgs], [IDL.Opt(Account)], ['query']),
    'accounts' : IDL.Func([], [IDL.Vec(Account)], ['query']),
    'balance' : IDL.Func([IDL.Text], [IDL.Nat64], ['query']),
    'get_notification' : IDL.Func([], [IDL.Text], ['query']),
    'receive_notification' : IDL.Func([IDL.Text], [], []),
    'transfer' : IDL.Func([IDL.Text, IDL.Text, IDL.Nat64], [IDL.Nat64], []),
    'trap' : IDL.Func([], [IDL.Text], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
