export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'msgCyclesAccept' : IDL.Func([IDL.Nat64], [IDL.Nat64], []),
  });
};
export const init = ({ IDL }) => { return []; };
