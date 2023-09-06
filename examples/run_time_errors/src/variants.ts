import { Tuple, Null, Variant, Vec, bool, candid, int, text } from 'azle';
import { UserDefinedRecord } from './records';

export class UserDefinedVariant extends Variant {
    @candid(Null)
    Alpha: Null;

    @candid(bool)
    Beta: bool;

    @candid(int)
    Gamma: int;

    @candid(text)
    Delta: text;

    @candid(UserDefinedRecord)
    Epsilon: UserDefinedRecord;

    @candid(Tuple(int, text))
    Zeta: [int, text];
}

// #region UserDefinedVariant
export function returnStringAsInvalidUserDefinedVariant(): UserDefinedVariant {
    // @ts-ignore
    return 'invalid type';
}

export function returnEmptyObjectAsInvalidUserDefinedVariant(): UserDefinedVariant {
    // @ts-ignore
    return {};
}

export function returnObjectWithInvalidTagAsInvalidUserDefinedVariant(): UserDefinedVariant {
    return {
        // @ts-ignore
        TotallyInvalid: undefined
    };
}

export function returnObjectWithMultipleTagsAsInvalidUserDefinedVariant(): UserDefinedVariant {
    // @ts-ignore
    return {
        Alpha: null,
        Beta: true
    };
}

export function returnObjectWithInvalidFieldsAsInvalidUserDefinedVariant(): UserDefinedVariant {
    return {
        // @ts-ignore
        Zeta: [true, true]
    };
}
// #endregion UserDefinedVariant

// #region Vec<UserDefinedVariant>
export function returnStringAsInvalidVecUserDefinedVariant(): Vec<UserDefinedVariant> {
    // @ts-ignore
    return 'invalid type';
}

export function returnObjectAsInvalidVecUserDefinedVariant(): Vec<UserDefinedVariant> {
    // @ts-ignore
    return {};
}

export function returnArrayWithInvalidUserDefinedVariant(): Vec<UserDefinedVariant> {
    // @ts-ignore
    return ['invalid type'];
}
// #endregion Vec<UserDefinedVariant>
