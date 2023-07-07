import * as deep from './deep_alias';
import * as mixed from './mixed_alias';
import { mixedAlias } from './mixed_alias';
import { mixedAlias as stirredAlias } from './mixed_alias';
import { deepAlias } from './deep_alias';
import * as azle from 'azle';
import { Record, int } from 'azle';

// export type DeepRecordAlias<T extends object> =
//     deep.deepAlias.deeperAlias.deepestAlias.Record<T>;
export type DeepIntAlias = deep.deepAlias.deeperAlias.deepestAlias.int;
export type DeepTextAlias = deep.deepAlias.deeperAlias.deepestAlias.text;
export type DeepNatAlias = deepAlias.deeperAlias.deepestAlias.nat;

// export type AzleRecordAlias<T extends object> = azle.Record<T>;
export type AzleIntAlias = azle.int;
export type AzleTextAlias = azle.text;
// export type AzleAliasRecordAlias = azle.Alias<azle.Record>;

// export type RecordAlias<T extends object> = Record<T>;
export type IntAlias = int;
export type TextAlias = string;
export type Float64Alias = number;

export type MixedIntAlias =
    mixed.mixedAlias.deepAlias.deeperAlias.deepestAlias.int;
export type MixedTextAlias = mixedAlias.deepAlias.deeperAlias.deepestAlias.text;

export type StirredTextAlias =
    stirredAlias.deepAlias.deeperAlias.deepestAlias.text;
