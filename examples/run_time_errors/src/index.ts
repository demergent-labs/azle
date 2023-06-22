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
