export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'msgCyclesAccept128' : IDL.Func([IDL.Nat], [IDL.Nat], []),
    'sendCycles' : IDL.Func([], [IDL.Nat64], []),
  });
};
export const init = ({ IDL }) => { return []; };
