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
    switch (type) {
        case 'Null':
            return 'null';
        case 'Principal':
            return 'Principal';
        case 'Void':
            return 'void';
        case 'blob':
            return 'number[]';
        case 'bool':
            return 'boolean';
        case 'float32':
        case 'float64':
        case 'int8':
        case 'int16':
        case 'int32':
        case 'nat16':
        case 'nat32':
        case 'nat8':
            return 'number';
        case 'int':
        case 'int64':
        case 'nat':
        case 'nat64':
            return 'bigint';
        case 'text':
            return 'string';
    }
}
