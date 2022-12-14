import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Person {
    age: number;
    name: string;
}
export type State = { gas: null } | { solid: null } | { liquid: null };
export interface _SERVICE {
    list_of_blob: ActorMethod<[Array<Uint8Array>], Array<Uint8Array>>;
    list_of_bool: ActorMethod<
        [Array<Array<Array<boolean>>>],
        Array<Array<Array<boolean>>>
    >;
    list_of_empty: ActorMethod<[], Array<Array<Array<never>>>>;
    list_of_f32: ActorMethod<
        [Array<Array<Array<number>>>],
        Array<Array<Array<number>>>
    >;
    list_of_f64: ActorMethod<
        [Array<Array<Array<number>>>],
        Array<Array<Array<number>>>
    >;
    list_of_func: ActorMethod<
        [Array<Array<Array<[Principal, string]>>>],
        Array<Array<Array<[Principal, string]>>>
    >;
    list_of_int: ActorMethod<
        [Array<Array<Array<bigint>>>],
        Array<Array<Array<bigint>>>
    >;
    list_of_int16: ActorMethod<
        [Array<Array<Int16Array>>],
        Array<Array<Int16Array>>
    >;
    list_of_int32: ActorMethod<
        [Array<Array<Int32Array>>],
        Array<Array<Int32Array>>
    >;
    list_of_int64: ActorMethod<
        [Array<Array<BigInt64Array>>],
        Array<Array<BigInt64Array>>
    >;
    list_of_int8: ActorMethod<
        [Array<Array<Int8Array>>],
        Array<Array<Int8Array>>
    >;
    list_of_list_of_blob: ActorMethod<
        [Array<Array<Uint8Array>>],
        Array<Array<Uint8Array>>
    >;
    list_of_list_of_int8: ActorMethod<
        [],
        Array<Array<Array<Array<Array<Array<Int8Array>>>>>>
    >;
    list_of_nat: ActorMethod<
        [Array<Array<Array<bigint>>>],
        Array<Array<Array<bigint>>>
    >;
    list_of_nat16: ActorMethod<
        [Array<Array<Uint16Array>>],
        Array<Array<Uint16Array>>
    >;
    list_of_nat32: ActorMethod<
        [Array<Array<Uint32Array>>],
        Array<Array<Uint32Array>>
    >;
    list_of_nat64: ActorMethod<
        [Array<Array<BigUint64Array>>],
        Array<Array<BigUint64Array>>
    >;
    list_of_nat8: ActorMethod<
        [Array<Array<Uint8Array>>],
        Array<Array<Uint8Array>>
    >;
    list_of_null: ActorMethod<
        [Array<Array<Array<null>>>],
        Array<Array<Array<null>>>
    >;
    list_of_option_string: ActorMethod<
        [Array<Array<Array<[] | [string]>>>],
        Array<Array<Array<[] | [string]>>>
    >;
    list_of_principal: ActorMethod<
        [Array<Array<Array<Principal>>>],
        Array<Array<Array<Principal>>>
    >;
    list_of_record: ActorMethod<
        [Array<Array<Array<Person>>>],
        Array<Array<Array<Person>>>
    >;
    list_of_reserved: ActorMethod<[], Array<Array<Array<any>>>>;
    list_of_string: ActorMethod<
        [Array<Array<Array<string>>>],
        Array<Array<Array<string>>>
    >;
    list_of_string_four: ActorMethod<
        [Array<Array<Array<Array<string>>>>],
        Array<Array<Array<Array<string>>>>
    >;
    list_of_string_one: ActorMethod<[Array<string>], Array<string>>;
    list_of_string_two: ActorMethod<
        [Array<Array<string>>],
        Array<Array<string>>
    >;
    list_of_variant: ActorMethod<
        [Array<Array<Array<State>>>],
        Array<Array<Array<State>>>
    >;
}
