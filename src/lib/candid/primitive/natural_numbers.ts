import { IDL } from '../..';

export class AzleNat {
    _kind: 'AzleNat' = 'AzleNat';
    _azleCandidType?: '_azleCandidType';

    static getIDL() {
        return IDL.Nat;
    }
}

export class AzleNat64 {
    _kind: 'AzleNat64' = 'AzleNat64';
    _azleCandidType?: '_azleCandidType';

    static getIDL() {
        return IDL.Nat64;
    }
}

export class AzleNat32 {
    _kind: 'AzleNat32' = 'AzleNat32';
    _azleCandidType?: '_azleCandidType';

    static getIDL() {
        return IDL.Nat32;
    }
}

export class AzleNat16 {
    _kind: 'AzleNat16' = 'AzleNat16';
    _azleCandidType?: '_azleCandidType';

    static getIDL() {
        return IDL.Nat16;
    }
}

export class AzleNat8 {
    _kind: 'AzleNat8' = 'AzleNat8';
    _azleCandidType?: '_azleCandidType';

    static getIDL() {
        return IDL.Nat8;
    }
}

export const nat: AzleNat = AzleNat as any;
export type nat = bigint;
export const nat8: AzleNat8 = AzleNat8 as any;
export type nat8 = number;
export const nat16: AzleNat16 = AzleNat16 as any;
export type nat16 = number;
export const nat32: AzleNat32 = AzleNat32 as any;
export type nat32 = number;
export const nat64: AzleNat64 = AzleNat64 as any;
export type nat64 = bigint;
