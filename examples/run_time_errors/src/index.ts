export {
    throwBigint,
    throwBoolean,
    throwClass,
    throwCustomError,
    throwInt,
    throwNull,
    throwNullReference,
    throwObject,
    throwRational,
    throwString,
    throwSymbol,
    throwUndefined,
    getInitialized,
    heartbeat,
    inspectMessage,
    accessible,
    inaccessible,
    alsoInaccessible
} from './throws';

export {
    returnNonObject,
    returnBothSomeAndNone,
    returnObjectWithNeitherSomeNorNone,
    returnNonNullNone,
    returnInvalidSomeValue
} from './opt';

export {
    returnInvalidBlobValue,
    returnInvalidBooleanValue,
    returnInvalidEmptyValue,
    returnInvalidNullValue,
    returnInvalidStringValue,
    returnInvalidTextValue,
    returnInvalidVoidValue
} from './primitives';

export {
    returnInvalidNumber,
    returnInvalidInt,
    returnInvalidInt8,
    returnInvalidInt16,
    returnInvalidInt32,
    returnInvalidInt64,
    returnInvalidNat,
    returnInvalidNat8,
    returnInvalidNat16,
    returnInvalidNat32,
    returnInvalidNat64,
    returnInvalidFloat32,
    returnInvalidFloat64
} from './numbers';

export {
    returnNonArrayValueAsInvalidFunc,
    returnEmptyObjectAsInvalidFunc,
    returnEmptyArrayAsInvalidFunc,
    returnNonPrincipalValueAsInvalidFunc,
    returnEmptyObjectPrincipalAsInvalidFunc,
    returnArrayWithOnlyPrincipalAsInvalidFunc,
    returnNonStringCanisterMethodNameAsInvalidFunc
} from './func';

// $query;
// export function returnInvalidFuncValue(): Func<Query<() => string>> {
//     // @ts-expect-error
//     return 'invalid type';
// }

// $query;
// export function returnInvalidPrincipalValue(): Principal {
//     // @ts-expect-error
//     return 'invalid type';
// }

// $query;
// export function returnInvalidValue(): TimerId {
//     // @ts-expect-error
//     return 'invalid type';
// }
