export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'sendCycles' : IDL.Func([], [IDL.Nat64], []),
    'sendCycles128' : IDL.Func([], [IDL.Nat], []),
  });
};
