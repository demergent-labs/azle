import {
    ic,
    candid,
    query,
    Record,
    update,
    int,
    Null,
    record,
    Void
} from 'azle';

@record
class PartiallyNullRecord extends Record {
    @candid(int)
    firstItem: int;

    @candid(Null)
    secondItem: Null;

    @candid(int)
    thirdItem: int;
}

@record
class TwoNullRecord extends Record {
    @candid(Null)
    firstItem: Null;

    @candid(Null)
    secondItem: Null;
}

@record
class ThreeNullRecord extends Record {
    @candid(Null)
    firstItem: null;

    @candid(Null)
    secondItem: null;

    @candid(Null)
    thirdItem: null;
}

export default class {
    @query([Null], Null)
    nullFunction(param: null): null {
        return param;
    }

    @query([], Void)
    voidIsNotNull(): void {
        ic.print(
            'Even though they are both None in Python, for Candid null and void are different.'
        );
    }

    @query([], PartiallyNullRecord)
    getPartiallyNullRecord(): PartiallyNullRecord {
        return PartiallyNullRecord.create({
            firstItem: 1n,
            secondItem: null,
            thirdItem: 3n
        });
    }

    @update([PartiallyNullRecord], PartiallyNullRecord)
    setPartiallyNullRecord(param: PartiallyNullRecord): PartiallyNullRecord {
        return param;
    }

    @query([], TwoNullRecord)
    getSmallNullRecord(): TwoNullRecord {
        return TwoNullRecord.create({
            firstItem: null,
            secondItem: null
        });
    }

    @update([TwoNullRecord], TwoNullRecord)
    setSmallNullRecord(param: TwoNullRecord): TwoNullRecord {
        return param;
    }

    @query([], ThreeNullRecord)
    getLargeNullRecord(): ThreeNullRecord {
        return ThreeNullRecord.create({
            firstItem: null,
            secondItem: null,
            thirdItem: null
        });
    }

    @update([ThreeNullRecord], ThreeNullRecord)
    setLargeNullRecord(param: ThreeNullRecord): ThreeNullRecord {
        return param;
    }
}
