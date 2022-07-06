export const idlFactory = ({ IDL }) => {
  const BooleansResult = IDL.Record({
    'value' : IDL.Vec(IDL.Bool),
    'wasm_instructions' : IDL.Nat64,
  });
  const BooleanResult = IDL.Record({
    'value' : IDL.Bool,
    'wasm_instructions' : IDL.Nat64,
  });
  const NatsResult = IDL.Record({
    'value' : IDL.Vec(IDL.Nat),
    'wasm_instructions' : IDL.Nat64,
  });
  const NatResult = IDL.Record({
    'value' : IDL.Nat,
    'wasm_instructions' : IDL.Nat64,
  });
  return IDL.Service({
    'boolean_candid_serde_many' : IDL.Func(
        [IDL.Vec(IDL.Bool)],
        [BooleansResult],
        [],
      ),
    'boolean_candid_serde_one' : IDL.Func([IDL.Bool], [BooleanResult], []),
    'boolean_init_heap' : IDL.Func([IDL.Nat32], [BooleanResult], []),
    'boolean_init_stack' : IDL.Func([IDL.Nat32], [BooleanResult], []),
    'empty' : IDL.Func([], [IDL.Nat64], []),
    'nat_candid_serde_many' : IDL.Func([IDL.Vec(IDL.Nat)], [NatsResult], []),
    'nat_candid_serde_one' : IDL.Func([IDL.Nat], [NatResult], []),
    'nat_init_heap' : IDL.Func([IDL.Nat32], [NatResult], []),
    'nat_init_stack' : IDL.Func([IDL.Nat32], [NatResult], []),
  });
};
export const init = ({ IDL }) => { return []; };
