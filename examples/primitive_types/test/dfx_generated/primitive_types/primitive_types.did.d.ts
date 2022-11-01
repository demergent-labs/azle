import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
    get_empty: ActorMethod<[], never>;
    get_float32: ActorMethod<[], number>;
    get_float64: ActorMethod<[], number>;
    get_int: ActorMethod<[], bigint>;
    get_int16: ActorMethod<[], number>;
    get_int32: ActorMethod<[], number>;
    get_int64: ActorMethod<[], bigint>;
    get_int8: ActorMethod<[], number>;
    get_nat: ActorMethod<[], bigint>;
    get_nat16: ActorMethod<[], number>;
    get_nat32: ActorMethod<[], number>;
    get_nat64: ActorMethod<[], bigint>;
    get_nat8: ActorMethod<[], number>;
    get_null: ActorMethod<[], null>;
    get_principal: ActorMethod<[], Principal>;
    get_reserved: ActorMethod<[], any>;
    print_empty: ActorMethod<[never], never>;
    print_float32: ActorMethod<[number], number>;
    print_float64: ActorMethod<[number], number>;
    print_int: ActorMethod<[bigint], bigint>;
    print_int16: ActorMethod<[number], number>;
    print_int32: ActorMethod<[number], number>;
    print_int64: ActorMethod<[bigint], bigint>;
    print_int8: ActorMethod<[number], number>;
    print_nat: ActorMethod<[bigint], bigint>;
    print_nat16: ActorMethod<[number], number>;
    print_nat32: ActorMethod<[number], number>;
    print_nat64: ActorMethod<[bigint], bigint>;
    print_nat8: ActorMethod<[number], number>;
    print_null: ActorMethod<[null], null>;
    print_principal: ActorMethod<[Principal], Principal>;
    print_reserved: ActorMethod<[any], any>;
}
