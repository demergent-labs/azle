export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'incrementCount' : IDL.Func([], [IDL.Nat64], []),
    'readCount' : IDL.Func([], [IDL.Nat64], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
