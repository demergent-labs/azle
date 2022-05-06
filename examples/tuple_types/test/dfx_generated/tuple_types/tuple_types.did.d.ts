import type { Principal } from '@dfinity/principal';
export type ComplexThreeTuple = [PrimitiveTwoTuple, User, Reaction];
export type ComplexTwoTuple = [PrimitiveTwoTuple, User];
export type PrimitiveThreeTuple = [string, bigint, Principal];
export type PrimitiveTwoTuple = [string, bigint];
export type Reaction = { 'Bad' : ComplexThreeTuple } |
  { 'Good' : null };
export interface User {
  'id' : string,
  'primitive_two_tuple' : PrimitiveTwoTuple,
}
export interface _SERVICE {
  'complex_three_tuple_param' : (arg_0: ComplexThreeTuple) => Promise<
      ComplexThreeTuple
    >,
  'complex_three_tuple_return_type' : () => Promise<ComplexThreeTuple>,
  'complex_two_tuple_param' : (arg_0: ComplexTwoTuple) => Promise<
      ComplexTwoTuple
    >,
  'complex_two_tuple_return_type' : () => Promise<ComplexTwoTuple>,
  'primitive_three_tuple_param' : (arg_0: PrimitiveThreeTuple) => Promise<
      PrimitiveThreeTuple
    >,
  'primitive_three_tuple_return_type' : () => Promise<PrimitiveThreeTuple>,
  'primitive_two_tuple_param' : (arg_0: PrimitiveTwoTuple) => Promise<
      PrimitiveTwoTuple
    >,
  'primitive_two_tuple_return_type' : () => Promise<PrimitiveTwoTuple>,
}
