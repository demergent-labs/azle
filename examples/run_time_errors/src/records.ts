import { bool, Record, Vec, candid, int, text } from 'azle';

export class OtherUserDefinedRecord extends Record {
    @candid(text)
    id: text;
}

export class UserDefinedRecord extends Record {
    @candid(bool)
    boolean: bool;

    @candid(int)
    int: int;

    @candid(text)
    string: text;

    @candid(OtherUserDefinedRecord)
    otherUserDefinedRecord: OtherUserDefinedRecord;
}

// #region UserDefinedRecord
export function returnStringAsInvalidUserDefinedRecord(): UserDefinedRecord {
    // @ts-ignore
    return 'invalid type';
}

export function returnEmptyObjectAsInvalidUserDefinedRecord(): UserDefinedRecord {
    // @ts-ignore
    return {};
}
// #endregion UserDefinedRecord

// #region Vec<UserDefinedRecord>
export function returnStringAsInvalidVecUserDefinedRecord(): Vec<UserDefinedRecord> {
    // @ts-ignore
    return '';
}

export function returnObjectAsInvalidVecUserDefinedRecord(): Vec<UserDefinedRecord> {
    // @ts-ignore
    return {};
}

export function returnArrayWithInvalidUserDefinedRecord(): Vec<UserDefinedRecord> {
    // @ts-ignore
    return ['invalid type'];
}
// #endregion Vec<UserDefinedRecord>
