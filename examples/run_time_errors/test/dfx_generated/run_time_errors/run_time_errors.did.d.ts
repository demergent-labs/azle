import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
    accessible: ActorMethod<[], boolean>;
    alsoInaccessible: ActorMethod<[], boolean>;
    getInitialized: ActorMethod<[], boolean>;
    inaccessible: ActorMethod<[], boolean>;
    throw_bigint: ActorMethod<[], undefined>;
    throw_boolean: ActorMethod<[], undefined>;
    throw_class: ActorMethod<[], undefined>;
    throw_custom_error: ActorMethod<[], undefined>;
    throw_int: ActorMethod<[], undefined>;
    throw_null: ActorMethod<[], undefined>;
    throw_null_reference: ActorMethod<[], undefined>;
    throw_object: ActorMethod<[], undefined>;
    throw_rational: ActorMethod<[], undefined>;
    throw_string: ActorMethod<[], undefined>;
    throw_symbol: ActorMethod<[], undefined>;
    throw_undefined: ActorMethod<[], undefined>;
}
