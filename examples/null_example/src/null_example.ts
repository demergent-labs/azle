import { ic, int, $query, Record, $update } from 'azle';

type PartiallyNullRecord = Record<{
    firstItem: int;
    secondItem: null;
    thirdItem: int;
}>;

type TwoNullRecord = Record<{
    firstItem: null;
    secondItem: null;
}>;

type ThreeNullRecord = Record<{
    firstItem: null;
    secondItem: null;
    thirdItem: null;
}>;

$query;
export function nullFunction(param: null): null {
    return param;
}

$query;
export function voidIsNotNull(): void {
    ic.print(
        'Even though they are both None in Python, for Candid null and void are different.'
    );
}

$query;
export function getPartiallyNullRecord(): PartiallyNullRecord {
    return {
        firstItem: 1n,
        secondItem: null,
        thirdItem: 3n
    };
}

$update;
export function setPartiallyNullRecord(
    param: PartiallyNullRecord
): PartiallyNullRecord {
    return param;
}

$query;
export function getSmallNullRecord(): TwoNullRecord {
    return {
        firstItem: null,
        secondItem: null
    };
}

$update;
export function setSmallNullRecord(param: TwoNullRecord): TwoNullRecord {
    return param;
}

$query;
export function getLargeNullRecord(): ThreeNullRecord {
    return {
        firstItem: null,
        secondItem: null,
        thirdItem: null
    };
}

$update;
export function setLargeNullRecord(param: ThreeNullRecord): ThreeNullRecord {
    return param;
}
