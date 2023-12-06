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
