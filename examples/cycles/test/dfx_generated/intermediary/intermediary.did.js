export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'reportRefund' : IDL.Func([], [IDL.Nat64], []),
    'reportRefund128' : IDL.Func([], [IDL.Nat], []),
  });
};
export const init = ({ IDL }) => { return []; };
