import * as deep from './deep_alias';
import * as mixed from './mixed_alias';
import { mixedAlias } from './mixed_alias';
import { mixedAlias as stirredAlias } from './mixed_alias';
import { deepAlias } from './deep_alias';
import * as azle from 'azle';
import { Record, int, query } from 'azle';

export const AzleRecordAlias = azle.Record;
export const AzleIntAlias = azle.int;
export const AzleTextAlias = azle.text;
export const Azle$queryAlias = azle.query;

export const RecordAlias = Record;
export const IntAlias = int;
export const TextAlias = azle.text;
export const Float64Alias = azle.float64;
export const VoidAlias = azle.Void;
export const $queryAlias = query;
export const UserDefinedAlias = Record({ num: Float64Alias });

export const MixedIntAlias =
    mixed.mixedAlias.deepAlias.deeperAlias.deepestAlias.int;
export const MixedTextAlias =
    mixedAlias.deepAlias.deeperAlias.deepestAlias.text;
export const MixedRecordAlias =
    mixedAlias.deepAlias.deeperAlias.deepestAlias.Record;
export const MixedUserDefinedAlias =
    mixedAlias.deepAlias.deeperAlias.deepestAlias.Record({
        num: MixedIntAlias
    });
export const MixedStarRecord = mixed.mixedAlias.StarRecord;
export const MixedConcreteStar = mixed.mixedAlias.StartRecordAlias({
    star: azle.bool
});

export const StirredTextAlias =
    stirredAlias.deepAlias.deeperAlias.deepestAlias.text;
export const StirredIntAlias = deepAlias.deeperAlias.deepestAlias.int;
export const StirredRecordAlias =
    stirredAlias.deepAlias.deeperAlias.deepestAlias.Record;
export const StirredUserDefinedAlias =
    mixedAlias.deepAlias.deeperAlias.deepestAlias.Record({
        num: StirredIntAlias
    });

export const DeepBlobAlias = deep.deepAlias.deeperAlias.deepestAlias.blob;
export const DeepEmptyAlias = deep.deepAlias.deeperAlias.deepestAlias.empty;
export const DeepFloat32Alias = deep.deepAlias.deeperAlias.deepestAlias.float32;
export const DeepFloat64Alias = deep.deepAlias.deeperAlias.deepestAlias.float64;
export const DeepFuncAlias = deep.deepAlias.deeperAlias.deepestAlias.Func;
export const DeepIntAlias = deep.deepAlias.deeperAlias.deepestAlias.int;
export const DeepInt8Alias = deep.deepAlias.deeperAlias.deepestAlias.int8;
export const DeepManualAlias = deep.deepAlias.deeperAlias.deepestAlias.Manual;
export const DeepNatAlias = deep.deepAlias.deeperAlias.deepestAlias.nat;
export const DeepNat8Alias = deep.deepAlias.deeperAlias.deepestAlias.nat8;
export const DeepOptAlias = deep.deepAlias.deeperAlias.deepestAlias.Opt;
export const DeepPrincipalAlias =
    deep.deepAlias.deeperAlias.deepestAlias.Principal;
export const Deep$queryAlias = deep.deepAlias.deeperAlias.deepestAlias.query;
export const DeepRecordAlias = deep.deepAlias.deeperAlias.deepestAlias.Record;
export const DeepReservedAlias =
    deep.deepAlias.deeperAlias.deepestAlias.reserved;
export const DeepCanisterAlias =
    deep.deepAlias.deeperAlias.deepestAlias.Canister;
export const DeepStableBTreeMapAlias =
    deep.deepAlias.deeperAlias.deepestAlias.StableBTreeMap;
export const DeepTextAlias = deep.deepAlias.deeperAlias.deepestAlias.text;
export const DeepTupleAlias = deep.deepAlias.deeperAlias.deepestAlias.Tuple;
export const DeepVariantAlias = deep.deepAlias.deeperAlias.deepestAlias.Variant;
export const DeepVecAlias = deep.deepAlias.deeperAlias.deepestAlias.Vec;
