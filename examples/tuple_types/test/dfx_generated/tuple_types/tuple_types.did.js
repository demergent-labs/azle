export const idlFactory = ({ IDL }) => {
  const ComplexThreeTuple = IDL.Rec();
  const PrimitiveTwoTuple = IDL.Tuple(IDL.Text, IDL.Nat64);
  const User = IDL.Record({
    'id' : IDL.Text,
    'primitive_two_tuple' : PrimitiveTwoTuple,
  });
  const Reaction = IDL.Variant({
    'Bad' : ComplexThreeTuple,
    'Good' : IDL.Null,
  });
  ComplexThreeTuple.fill(IDL.Tuple(PrimitiveTwoTuple, User, Reaction));
  const ComplexTwoTuple = IDL.Tuple(PrimitiveTwoTuple, User);
  const PrimitiveThreeTuple = IDL.Tuple(IDL.Text, IDL.Nat64, IDL.Principal);
  return IDL.Service({
    'complex_three_tuple_param' : IDL.Func(
        [ComplexThreeTuple],
        [ComplexThreeTuple],
        ['query'],
      ),
    'complex_three_tuple_return_type' : IDL.Func(
        [],
        [ComplexThreeTuple],
        ['query'],
      ),
    'complex_two_tuple_param' : IDL.Func(
        [ComplexTwoTuple],
        [ComplexTwoTuple],
        ['query'],
      ),
    'complex_two_tuple_return_type' : IDL.Func(
        [],
        [ComplexTwoTuple],
        ['query'],
      ),
    'primitive_three_tuple_param' : IDL.Func(
        [PrimitiveThreeTuple],
        [PrimitiveThreeTuple],
        ['query'],
      ),
    'primitive_three_tuple_return_type' : IDL.Func(
        [],
        [PrimitiveThreeTuple],
        ['query'],
      ),
    'primitive_two_tuple_param' : IDL.Func(
        [PrimitiveTwoTuple],
        [PrimitiveTwoTuple],
        ['query'],
      ),
    'primitive_two_tuple_return_type' : IDL.Func(
        [],
        [PrimitiveTwoTuple],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
