import type { Principal } from '@dfinity/principal';
export type CanisterTuple1 = [string, bigint];
export type CanisterTuple2 = [string, CanisterTuple1];
export type ComplexThreeTuple = [PrimitiveTwoTuple, User, Reaction];
export type ComplexTwoTuple = [PrimitiveTwoTuple, User];
export type Header = [string, string];
export interface HttpResponse {
    headers: Array<Header>;
}
export type PrimitiveThreeTuple = [string, bigint, Principal];
export type PrimitiveTwoTuple = [string, bigint];
export type Reaction = { Bad: ComplexThreeTuple } | { Good: null };
export type StableTuple1 = [string, bigint];
export type StableTuple2 = [string, CanisterTuple1];
export type StreamingCallbackType =
    | { without_headers: null }
    | { with_headers: Array<Header> };
export interface User {
    id: string;
    primitive_two_tuple: PrimitiveTwoTuple;
}
export interface _SERVICE {
    complex_three_tuple_param: (
        arg_0: ComplexThreeTuple
    ) => Promise<ComplexThreeTuple>;
    complex_three_tuple_return_type: () => Promise<ComplexThreeTuple>;
    complex_two_tuple_param: (
        arg_0: ComplexTwoTuple
    ) => Promise<ComplexTwoTuple>;
    complex_two_tuple_return_type: () => Promise<ComplexTwoTuple>;
    primitive_three_tuple_param: (
        arg_0: PrimitiveThreeTuple
    ) => Promise<PrimitiveThreeTuple>;
    primitive_three_tuple_return_type: () => Promise<PrimitiveThreeTuple>;
    primitive_two_tuple_param: (
        arg_0: PrimitiveTwoTuple
    ) => Promise<PrimitiveTwoTuple>;
    primitive_two_tuple_return_type: () => Promise<PrimitiveTwoTuple>;
    tuple_array_params_and_return_type: (
        arg_0: Array<Header>
    ) => Promise<Array<Header>>;
    tuple_array_record_field: () => Promise<HttpResponse>;
    tuple_array_variant_field: () => Promise<StreamingCallbackType>;
}
