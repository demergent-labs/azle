import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface AzleInline13573015674368967065 {
    goodbye: bigint;
}
export interface AzleInline2622686677058427252 {
    hello: bigint;
}
export type Box =
    | {
          Bad: [
              [string, bigint],
              { id: string; primitive_two_tuple: [string, bigint] },
              Box
          ];
      }
    | { Good: null };
export interface HttpResponse {
    headers: Array<[string, string]>;
}
export type Reaction = { Bad: [[string, bigint], User, Box] } | { Good: null };
export type StreamingCallbackType =
    | { without_headers: null }
    | { with_headers: Array<[string, string]> };
export interface User {
    id: string;
    primitive_two_tuple: [string, bigint];
}
export interface _SERVICE {
    complex_one_tuple_inline_param: ActorMethod<
        [[string, bigint]],
        [string, bigint]
    >;
    complex_one_tuple_inline_return_type: ActorMethod<[], [string, bigint]>;
    complex_one_tuple_param: ActorMethod<[[string, bigint]], [string, bigint]>;
    complex_one_tuple_return_type: ActorMethod<[], [string, bigint]>;
    complex_three_tuple_inline_param: ActorMethod<
        [[[string, bigint], User, Reaction]],
        [[string, bigint], User, Reaction]
    >;
    complex_three_tuple_inline_return_type: ActorMethod<
        [],
        [[string, bigint], User, Reaction]
    >;
    complex_three_tuple_param: ActorMethod<
        [[[string, bigint], User, Box]],
        [[string, bigint], User, Box]
    >;
    complex_three_tuple_return_type: ActorMethod<
        [],
        [[string, bigint], User, Box]
    >;
    complex_two_tuple_inline_param: ActorMethod<
        [[[string, bigint], User]],
        [[string, bigint], User]
    >;
    complex_two_tuple_inline_return_type: ActorMethod<
        [],
        [[string, bigint], User]
    >;
    complex_two_tuple_param: ActorMethod<
        [[[string, bigint], User]],
        [[string, bigint], User]
    >;
    complex_two_tuple_return_type: ActorMethod<[], [[string, bigint], User]>;
    primitive_one_tuple_inline_param: ActorMethod<[string], string>;
    primitive_one_tuple_inline_return_type: ActorMethod<[], string>;
    primitive_one_tuple_param: ActorMethod<[string], string>;
    primitive_one_tuple_return_type: ActorMethod<[], string>;
    primitive_three_tuple_inline_param: ActorMethod<
        [[string, bigint, Principal]],
        [string, bigint, Principal]
    >;
    primitive_three_tuple_inline_return_type: ActorMethod<
        [],
        [string, bigint, Principal]
    >;
    primitive_three_tuple_param: ActorMethod<
        [[string, bigint, Principal]],
        [string, bigint, Principal]
    >;
    primitive_three_tuple_return_type: ActorMethod<
        [],
        [string, bigint, Principal]
    >;
    primitive_two_tuple_inline_param: ActorMethod<
        [[string, string]],
        [string, string]
    >;
    primitive_two_tuple_inline_return_type: ActorMethod<[], [string, string]>;
    primitive_two_tuple_param: ActorMethod<
        [[string, bigint]],
        [string, bigint]
    >;
    primitive_two_tuple_return_type: ActorMethod<[], [string, bigint]>;
    tuple_array_params_and_return_type: ActorMethod<
        [Array<[string, string]>],
        Array<[string, string]>
    >;
    tuple_array_record_field: ActorMethod<[], HttpResponse>;
    tuple_array_variant_field: ActorMethod<[], StreamingCallbackType>;
    two_tuple_with_inline_records: ActorMethod<
        [[AzleInline2622686677058427252, AzleInline13573015674368967065]],
        [AzleInline2622686677058427252, AzleInline13573015674368967065]
    >;
}
