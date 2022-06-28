export const idlFactory = ({ IDL }) => {
  const QueryBoolResult = IDL.Record({
    'wasm_instructions' : IDL.Nat64,
    'boolean' : IDL.Bool,
  });
  return IDL.Service({
    'query_bool_init_heap' : IDL.Func(
        [IDL.Nat32],
        [QueryBoolResult],
        ['query'],
      ),
    'query_bool_init_stack' : IDL.Func(
        [IDL.Nat32],
        [QueryBoolResult],
        ['query'],
      ),
    'query_empty' : IDL.Func([], [IDL.Nat64], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
