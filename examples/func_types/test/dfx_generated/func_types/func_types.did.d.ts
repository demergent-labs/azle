import type { Principal } from '@dfinity/principal';
export type BasicFunc = (arg_0: string) => Promise<string>;
export type ComplexFunc = (arg_0: User, arg_1: Reaction) => Promise<bigint>;
export type Reaction = { 'Bad' : null } |
  { 'ComplexFunc' : ComplexFunc } |
  { 'Good' : null } |
  { 'BasicFunc' : BasicFunc };
export interface User {
  'id' : string,
  'basic_func' : BasicFunc,
  'complex_func' : ComplexFunc,
}
export interface _SERVICE {
  'basic_func_param' : (arg_0: [Principal, string]) => Promise<
      [Principal, string]
    >,
  'basic_func_return_type' : () => Promise<[Principal, string]>,
  'complex_func_param' : (arg_0: [Principal, string]) => Promise<
      [Principal, string]
    >,
  'complex_func_return_type' : () => Promise<[Principal, string]>,
}
