import { IDL } from '../..';

export class AzleInt {
    _kind: 'AzleInt' = 'AzleInt';
    _azleCandidType?: '_azleCandidType';

    static getIDL() {
        return IDL.Int;
    }
}

export class AzleInt64 {
    _kind: 'AzleInt64' = 'AzleInt64';
    _azleCandidType?: '_azleCandidType';

    static getIDL() {
        return IDL.Int64;
    }
}

export class AzleInt32 {
    _kind: 'AzleInt32' = 'AzleInt32';
    _azleCandidType?: '_azleCandidType';

    static getIDL() {
        return IDL.Int32;
    }
}

export class AzleInt16 {
    _kind: 'AzleInt16' = 'AzleInt16';
    _azleCandidType?: '_azleCandidType';

    static getIDL() {
        return IDL.Int16;
    }
}

export class AzleInt8 {
    _kind: 'AzleInt8' = 'AzleInt8';
    _azleCandidType?: '_azleCandidType';

    static getIDL() {
        return IDL.Int8;
    }
}

export const int: AzleInt = AzleInt as any;
export type int = bigint;
export const int8: AzleInt8 = AzleInt8 as any;
export type int8 = number;
export const int16: AzleInt16 = AzleInt16 as any;
export type int16 = number;
export const int32: AzleInt32 = AzleInt32 as any;
export type int32 = number;
export const int64: AzleInt64 = AzleInt64 as any;
export type int64 = bigint;
