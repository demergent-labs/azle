export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'get_randomness_directly' : IDL.Func([], [IDL.Vec(IDL.Nat8)], []),
    'get_randomness_indirectly' : IDL.Func([], [IDL.Vec(IDL.Nat8)], []),
    'get_randomness_super_indirectly' : IDL.Func([], [IDL.Vec(IDL.Nat8)], []),
  });
};
export const init = ({ IDL }) => { return []; };
