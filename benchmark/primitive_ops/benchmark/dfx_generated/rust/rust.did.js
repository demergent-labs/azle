export const idlFactory = ({ IDL }) => {
  const BooleanResult = IDL.Record({
    'value' : IDL.Bool,
    'wasm_instructions' : IDL.Nat64,
  });
  const NatResult = IDL.Record({
    'value' : IDL.Nat,
    'wasm_instructions' : IDL.Nat64,
  });
  return IDL.Service({
    'boolean_init_heap' : IDL.Func([IDL.Nat32], [BooleanResult], []),
    'boolean_init_stack' : IDL.Func([IDL.Nat32], [BooleanResult], []),
    'empty' : IDL.Func([], [IDL.Nat64], []),
    'nat_init_heap' : IDL.Func([IDL.Nat32], [NatResult], []),
    'nat_init_stack' : IDL.Func([IDL.Nat32], [NatResult], []),
  });
};
export const init = ({ IDL }) => { return []; };
