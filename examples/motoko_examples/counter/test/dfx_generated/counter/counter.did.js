export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'get' : IDL.Func([], [IDL.Nat64], ['query']),
    'inc' : IDL.Func([], [], []),
    'set' : IDL.Func([IDL.Nat64], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
