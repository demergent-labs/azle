import { $query, Tuple, Variant, Vec, int } from 'azle';
import { UserDefinedRecord } from './records';

export type UserDefinedVariant = Variant<{
    Alpha: null;
    Beta: boolean;
    Gamma: int;
    Delta: string;
    Epsilon: UserDefinedRecord;
    Zeta: Tuple<[int, string]>;
}>;

// #region UserDefinedVariant
$query;
export function returnStringAsInvalidUserDefinedVariant(): UserDefinedVariant {
    // @ts-ignore
    return 'invalid type';
}

$query;
export function returnEmptyObjectAsInvalidUserDefinedVariant(): UserDefinedVariant {
    // @ts-ignore
    return {};
}

$query;
export function returnObjectWithInvalidTagAsInvalidUserDefinedVariant(): UserDefinedVariant {
    return {
        // @ts-ignore
        TotallyInvalid: undefined
    };
}

$query;
export function returnObjectWithMultipleTagsAsInvalidUserDefinedVariant(): UserDefinedVariant {
    // @ts-ignore
    return {
        Alpha: null,
        Beta: true
    };
}

$query;
export function returnObjectWithInvalidFieldsAsInvalidUserDefinedVariant(): UserDefinedVariant {
    return {
        // @ts-ignore
        Zeta: [true, true]
    };
}
// #endregion UserDefinedVariant

// #region Vec<UserDefinedVariant>
$query;
export function returnStringAsInvalidVecUserDefinedVariant(): Vec<UserDefinedVariant> {
    // @ts-ignore
    return 'invalid type';
}

$query;
export function returnObjectAsInvalidVecUserDefinedVariant(): Vec<UserDefinedVariant> {
    // @ts-ignore
    return {};
}

$query;
export function returnArrayWithInvalidUserDefinedVariant(): Vec<UserDefinedVariant> {
    // @ts-ignore
    return ['invalid type'];
}
// #endregion Vec<UserDefinedVariant>
