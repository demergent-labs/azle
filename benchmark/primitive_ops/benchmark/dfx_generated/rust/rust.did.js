export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'boolean_init_heap' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'boolean_init_stack' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'empty' : IDL.Func([], [IDL.Nat64], []),
    'int_init_heap' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'int_init_stack' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'nat_init_heap' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
    'nat_init_stack' : IDL.Func([IDL.Nat32], [IDL.Nat64], []),
  });
};
export const init = ({ IDL }) => { return []; };
