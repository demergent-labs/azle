export type CandidType = ComplexCandidType | SimpleCandidType;

export type ComplexCandidType =
    | 'Func'
    | 'Opt'
    | 'Record'
    | 'Recursive'
    | 'Service'
    | 'Tuple'
    | 'Variant'
    | 'Vec';

export type SimpleCandidType =
    | 'blob'
    | 'bool'
    | 'float32'
    | 'float64'
    | 'int'
    | 'int16'
    | 'int32'
    | 'int64'
    | 'int8'
    | 'nat'
    | 'nat16'
    | 'nat32'
    | 'nat64'
    | 'nat8'
    | 'Null'
    | 'Principal'
    | 'text'
    | 'Void';

export function simpleCandidTypeToTsType(type: SimpleCandidType): string {
    if (type === 'Null') {
        return 'null';
    }

    if (type === 'Principal') {
        return 'Principal';
    }

    if (type === 'Void') {
        return 'void';
    }

    if (type === 'blob') {
        return 'Uint8Array';
    }

    if (type === 'bool') {
        return 'boolean';
    }

    if (
        type === 'float32' ||
        type === 'float64' ||
        type === 'int8' ||
        type === 'int16' ||
        type === 'int32' ||
        type === 'nat16' ||
        type === 'nat32' ||
        type === 'nat8'
    ) {
        return 'number';
    }

    if (
        type === 'int' ||
        type === 'int64' ||
        type === 'nat' ||
        type === 'nat64'
    ) {
        return 'bigint';
    }

    if (type === 'text') {
        return 'string';
    }

    throw new Error('Unreachable');
}
