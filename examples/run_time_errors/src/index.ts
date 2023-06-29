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

export {
    returnStringAsInvalidPrincipal,
    returnEmptyObjectAsInvalidPrincipal,
    returnInvalidToTextPropertyAsInvalidPrincipal,
    throwInPrincipalToTextMethodAsInvalidPrincipal,
    returnInvalidToTextReturnValueAsInvalidPrincipal,
    throwWhenCallingPrincipalFromText,
    returnInvalidPrincipalFromTooShortOfText
} from './principals';

export {
    returnNonObjectAsInvalidBlob,
    returnEmptyObjectAsInvalidBlob
} from './blob';

export {
    returnNonObjectAsInvalidVec,
    returnNonArrayAsInvalidVec
} from './vecs';

// $query;
// export function returnInvalidValue(): TimerId {
//     // @ts-expect-error
//     return 'invalid type';
// }
