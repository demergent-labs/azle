export const idlFactory = ({ IDL }) => {
  const ComplexFunc = IDL.Rec();
  const BasicFunc = IDL.Func([IDL.Text], [IDL.Text], []);
  const User = IDL.Record({
    'id' : IDL.Text,
    'basic_func' : BasicFunc,
    'complex_func' : ComplexFunc,
  });
  const Reaction = IDL.Variant({
    'Bad' : IDL.Null,
    'ComplexFunc' : ComplexFunc,
    'Good' : IDL.Null,
    'BasicFunc' : BasicFunc,
  });
  ComplexFunc.fill(IDL.Func([User, Reaction], [IDL.Nat64], []));
  return IDL.Service({
    'basic_func_param' : IDL.Func([BasicFunc], [BasicFunc], ['query']),
    'basic_func_return_type' : IDL.Func([], [BasicFunc], ['query']),
    'complex_func_param' : IDL.Func([ComplexFunc], [ComplexFunc], ['query']),
    'complex_func_return_type' : IDL.Func([], [ComplexFunc], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
