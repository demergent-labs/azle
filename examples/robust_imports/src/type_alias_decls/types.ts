import * as deep from './deep_alias';
import * as mixed from './mixed_alias';
import { mixedAlias } from './mixed_alias';
import { mixedAlias as stirredAlias } from './mixed_alias';
import { deepAlias } from './deep_alias';
import * as azle from 'azle';
import { Record, int, $query } from 'azle';

export type AzleRecordAlias<T extends object> = azle.Record<T>;
export type AzleIntAlias = azle.int;
export type AzleTextAlias = azle.text;
export const Azle$queryAlias = azle.$query;

export type RecordAlias<T extends object> = Record<T>;
export type IntAlias = int;
export type TextAlias = string;
export type Float64Alias = number;
export type VoidAlias = void;
export const $queryAlias = $query;
export type UserDefinedAlias = Record<{ num: Float64Alias }>;

export type MixedIntAlias =
    mixed.mixedAlias.deepAlias.deeperAlias.deepestAlias.int;
export type MixedTextAlias = mixedAlias.deepAlias.deeperAlias.deepestAlias.text;
export type MixedRecordAlias<T extends object> =
    mixedAlias.deepAlias.deeperAlias.deepestAlias.Record<T>;
export type MixedUserDefinedAlias =
    mixedAlias.deepAlias.deeperAlias.deepestAlias.Record<{
        num: MixedIntAlias;
    }>;
export type MixedStarRecord = mixed.mixedAlias.StarRecord;
export type MixedConcreteStar = mixed.mixedAlias.StartRecordAlias<{
    star: boolean;
}>;

export type StirredTextAlias =
    stirredAlias.deepAlias.deeperAlias.deepestAlias.text;
export type StirredIntAlias = deepAlias.deeperAlias.deepestAlias.int;
export type StirredRecordAlias<T extends object> =
    stirredAlias.deepAlias.deeperAlias.deepestAlias.Record<T>;
export type StirredUserDefinedAlias =
    mixedAlias.deepAlias.deeperAlias.deepestAlias.Record<{
        num: StirredIntAlias;
    }>;

export type DeepBlobAlias = deep.deepAlias.deeperAlias.deepestAlias.blob;
export type DeepEmptyAlias = deep.deepAlias.deeperAlias.deepestAlias.empty;
export type DeepFloat32Alias = deep.deepAlias.deeperAlias.deepestAlias.float32;
export type DeepFloat64Alias = deep.deepAlias.deeperAlias.deepestAlias.float64;
export type DeepFuncAlias<
    T extends
        | azle.Query<azle.FuncSignature>
        | azle.Update<azle.FuncSignature>
        | azle.Oneway<azle.FuncSignature>
> = deep.deepAlias.deeperAlias.deepestAlias.Func<T>;
export type DeepGuardResultAlias =
    deep.deepAlias.deeperAlias.deepestAlias.GuardResult;
export type DeepIntAlias = deep.deepAlias.deeperAlias.deepestAlias.int;
export type DeepInt8Alias = deep.deepAlias.deeperAlias.deepestAlias.int8;
export type DeepManualAlias<T> =
    deep.deepAlias.deeperAlias.deepestAlias.Manual<T>;
export type DeepNatAlias = deep.deepAlias.deeperAlias.deepestAlias.nat;
export type DeepNat8Alias = deep.deepAlias.deeperAlias.deepestAlias.nat8;
export type DeepOptAlias<T> = deep.deepAlias.deeperAlias.deepestAlias.Opt<T>;
export type DeepPrincipalAlias =
    deep.deepAlias.deeperAlias.deepestAlias.Principal;
export const Deep$queryAlias = deep.deepAlias.deeperAlias.deepestAlias.$query;
export type DeepQueryAlias<T extends (...args: any[]) => any> =
    deep.deepAlias.deeperAlias.deepestAlias.Query<T>;
export type DeepRecordAlias<T extends object> =
    deep.deepAlias.deeperAlias.deepestAlias.Record<T>;
export type DeepReservedAlias =
    deep.deepAlias.deeperAlias.deepestAlias.reserved;
export const DeepServiceAlias = deep.deepAlias.deeperAlias.deepestAlias.Service;
export const DeepServiceQueryAlias =
    deep.deepAlias.deeperAlias.deepestAlias.serviceQuery;
export const DeepStableBTreeMapAlias =
    deep.deepAlias.deeperAlias.deepestAlias.StableBTreeMap;
export type DeepTextAlias = deep.deepAlias.deeperAlias.deepestAlias.text;
export type DeepTupleAlias<T extends unknown[]> =
    deep.deepAlias.deeperAlias.deepestAlias.Tuple<T>;
export type DeepVariantAlias<T extends object> =
    deep.deepAlias.deeperAlias.deepestAlias.Variant<T>;
export type DeepVecAlias<T> = deep.deepAlias.deeperAlias.deepestAlias.Vec<T>;
