import { $query, Record, Vec, int } from 'azle';

export type OtherUserDefinedRecord = Record<{
    id: string;
}>;

export type UserDefinedRecord = Record<{
    boolean: boolean;
    int: int;
    string: string;
    otherUserDefinedRecord: OtherUserDefinedRecord;
}>;

// #region UserDefinedRecord
$query;
export function returnStringAsInvalidUserDefinedRecord(): UserDefinedRecord {
    // @ts-ignore
    return 'invalid type';
}

$query;
export function returnEmptyObjectAsInvalidUserDefinedRecord(): UserDefinedRecord {
    // @ts-ignore
    return {};
}
// #endregion UserDefinedRecord

// #region Vec<UserDefinedRecord>
$query;
export function returnStringAsInvalidVecUserDefinedRecord(): Vec<UserDefinedRecord> {
    // @ts-ignore
    return '';
}

$query;
export function returnObjectAsInvalidVecUserDefinedRecord(): Vec<UserDefinedRecord> {
    // @ts-ignore
    return {};
}

$query;
export function returnArrayWithInvalidUserDefinedRecord(): Vec<UserDefinedRecord> {
    // @ts-ignore
    return ['invalid type'];
}
// #endregion Vec<UserDefinedRecord>
