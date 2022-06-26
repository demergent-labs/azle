export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'query_empty' : IDL.Func([], [IDL.Nat64], ['query']),
    'query_nat64_add_many' : IDL.Func([], [IDL.Nat64], ['query']),
    'query_nat64_add_one' : IDL.Func([], [IDL.Nat64], ['query']),
    'query_string_initialize' : IDL.Func([], [IDL.Nat64], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
