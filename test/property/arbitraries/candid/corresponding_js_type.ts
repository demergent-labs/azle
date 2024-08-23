import { Principal } from '@dfinity/principal';

import { Opt } from './constructed/opt_arb';
import { Record } from './constructed/record_arb';
import { Tuple } from './constructed/tuple_arb';
import { Variant } from './constructed/variant_arb';
import { Vec } from './constructed/vec_arb';
import { Func } from './reference/func_arb';

export type CorrespondingJSType =
    | number
    | bigint
    | null
    | boolean
    | Principal
    | Uint8Array
    | string
    | Func
    | Opt
    | Variant
    | Record
    | Tuple
    | undefined
    | Int16Array
    | Int32Array
    | Int8Array
    | BigInt64Array
    | Uint16Array
    | Uint32Array
    | Uint8Array
    | BigUint64Array
    | Vec;
