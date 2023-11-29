export enum CandidClass {
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

export function primitiveCandidClassToType(candidClass: CandidClass): string {
    if (candidClass === CandidClass.Float32) {
        return 'float32';
    }
    if (candidClass === CandidClass.Float64) {
        return 'float64';
    }
    if (candidClass === CandidClass.Int) {
        return 'int';
    }
    if (candidClass === CandidClass.Int8) {
        return 'int8';
    }
    if (candidClass === CandidClass.Int16) {
        return 'int16';
    }
    if (candidClass === CandidClass.Int32) {
        return 'int32';
    }
    if (candidClass === CandidClass.Int64) {
        return 'int64';
    }
    if (candidClass === CandidClass.Nat) {
        return 'nat';
    }
    if (candidClass === CandidClass.Nat8) {
        return 'nat8';
    }
    if (candidClass === CandidClass.Nat16) {
        return 'nat16';
    }
    if (candidClass === CandidClass.Nat32) {
        return 'nat32';
    }
    if (candidClass === CandidClass.Nat64) {
        return 'nat64';
    }
    if (candidClass === CandidClass.Bool) {
        return 'bool';
    }
    if (candidClass === CandidClass.Null) {
        return 'null';
    }
    if (candidClass === CandidClass.Text) {
        return 'text';
    }
    return '';
}

export function primitiveCandidClassToImports(
    candidClass: CandidClass
): Set<string> {
    return new Set([primitiveCandidClassToType(candidClass)]);
}
