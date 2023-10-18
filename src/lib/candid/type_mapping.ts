import { AzleBlob, blob } from './types/constructed/blob';
import { AzleVec } from './types/constructed/vec';
import { AzleOpt, Opt } from './types/constructed/opt';
import { AzleTuple } from './types/constructed/tuple';
import { AzleNull, Null } from './types/primitive/null';
import { AzleReserved, reserved } from './types/primitive/reserved';
import { AzleEmpty, empty } from './types/primitive/empty';
import { AzleBool, bool } from './types/primitive/bool';
import { AzleText } from './types/primitive/text';
import { AzleVoid } from './types/primitive/void';
import { AzleFloat32, float32 } from './types/primitive/floats/float32';
import { AzleFloat64, float64 } from './types/primitive/floats/float64';
import { AzleInt, int } from './types/primitive/ints/int';
import { AzleInt8, int8 } from './types/primitive/ints/int8';
import { AzleInt16, int16 } from './types/primitive/ints/int16';
import { AzleInt32, int32 } from './types/primitive/ints/int32';
import { AzleInt64, int64 } from './types/primitive/ints/int64';
import { AzleNat, nat } from './types/primitive/nats/nat';
import { AzleNat8, nat8 } from './types/primitive/nats/nat8';
import { AzleNat16, nat16 } from './types/primitive/nats/nat16';
import { AzleNat32, nat32 } from './types/primitive/nats/nat32';
import { AzleNat64, nat64 } from './types/primitive/nats/nat64';
import { AzleResult, Result } from '../system_types';
import { Principal } from './types/reference/principal';

export type TypeMapping<T, RecursionLevel = 0> = RecursionLevel extends 10
    ? T
    : T extends () => any
    ? ReturnType<T>
    : T extends AzleText
    ? string
    : T extends AzleBool
    ? bool
    : T extends AzleInt
    ? int
    : T extends AzleInt64
    ? int64
    : T extends AzleInt32
    ? int32
    : T extends AzleInt16
    ? int16
    : T extends AzleInt8
    ? int8
    : T extends AzleNat
    ? nat
    : T extends AzleNat64
    ? nat64
    : T extends AzleNat32
    ? nat32
    : T extends AzleNat16
    ? nat16
    : T extends AzleNat8
    ? nat8
    : T extends AzleFloat64
    ? float64
    : T extends AzleFloat32
    ? float32
    : T extends AzleVoid
    ? void
    : T extends AzleTuple<infer U>
    ? {
          [K in keyof U]: TypeMapping<
              U[K],
              RecursionLevel extends 0
                  ? 1
                  : RecursionLevel extends 1
                  ? 2
                  : RecursionLevel extends 2
                  ? 3
                  : RecursionLevel extends 3
                  ? 4
                  : RecursionLevel extends 4
                  ? 5
                  : RecursionLevel extends 5
                  ? 6
                  : RecursionLevel extends 6
                  ? 7
                  : RecursionLevel extends 8
                  ? 9
                  : RecursionLevel extends 9
                  ? 10
                  : 10
          >;
      }
    : T extends AzleVec<infer U>
    ? TypeMapping<U>[]
    : T extends AzleOpt<infer Some>
    ? Opt<TypeMapping<Some>>
    : T extends AzleResult<infer U, infer W>
    ? Result<TypeMapping<U>, TypeMapping<W>>
    : T extends AzleBlob
    ? blob
    : T extends typeof Principal
    ? Principal
    : T extends AzleNull
    ? Null
    : T extends AzleReserved
    ? reserved
    : T extends AzleEmpty
    ? empty
    : T;
