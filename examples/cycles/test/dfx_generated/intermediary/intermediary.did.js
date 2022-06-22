export const idlFactory = ({ IDL }) => {
  return IDL.Service({ 'reportRefund' : IDL.Func([], [IDL.Nat64], []) });
};
export const init = ({ IDL }) => { return []; };
