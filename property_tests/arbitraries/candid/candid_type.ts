export enum CandidType {
    Opt,
    Record,
    Tuple,
    Variant,
    Vec,
    Blob,
    Float32,
    Float64,
    Int,
    Int8,
    Int16,
    Int32,
    Int64,
    Nat,
    Nat8,
    Nat16,
    Nat32,
    Nat64,
    Bool,
    Null,
    Text,
    Func,
    Principal,
    Service
}

export function primitiveCandidTypeToString(candidType: CandidType): string {
    if (candidType === CandidType.Float32) {
        return 'float32';
    }
    if (candidType === CandidType.Float64) {
        return 'float64';
    }
    if (candidType === CandidType.Int) {
        return 'int';
    }
    if (candidType === CandidType.Int8) {
        return 'int8';
    }
    if (candidType === CandidType.Int16) {
        return 'int16';
    }
    if (candidType === CandidType.Int32) {
        return 'int32';
    }
    if (candidType === CandidType.Int64) {
        return 'int64';
    }
    if (candidType === CandidType.Nat) {
        return 'nat';
    }
    if (candidType === CandidType.Nat8) {
        return 'nat8';
    }
    if (candidType === CandidType.Nat16) {
        return 'nat16';
    }
    if (candidType === CandidType.Nat32) {
        return 'nat32';
    }
    if (candidType === CandidType.Nat64) {
        return 'nat64';
    }
    if (candidType === CandidType.Bool) {
        return 'bool';
    }
    if (candidType === CandidType.Null) {
        return 'Null';
    }
    if (candidType === CandidType.Text) {
        return 'text';
    }
    if (candidType === CandidType.Principal) {
        return 'Principal';
    }
    return '';
}

export function primitiveCandidClassToImports(
    candidClass: CandidType
): Set<string> {
    return new Set([primitiveCandidTypeToString(candidClass)]);
}
