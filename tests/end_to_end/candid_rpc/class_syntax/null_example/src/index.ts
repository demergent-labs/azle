import { IDL, print, query, update } from 'azle';

const PartiallyNullRecord = IDL.Record({
    firstItem: IDL.Int,
    secondItem: IDL.Null,
    thirdItem: IDL.Int
});
type PartiallyNullRecord = {
    firstItem: bigint;
    secondItem: null;
    thirdItem: bigint;
};

const TwoNullRecord = IDL.Record({
    firstItem: IDL.Null,
    secondItem: IDL.Null
});
type TwoNullRecord = {
    firstItem: null;
    secondItem: null;
};

const ThreeNullRecord = IDL.Record({
    firstItem: IDL.Null,
    secondItem: IDL.Null,
    thirdItem: IDL.Null
});
type ThreeNullRecord = {
    firstItem: null;
    secondItem: null;
    thirdItem: null;
};

export default class {
    @query([IDL.Null], IDL.Null)
    nullFunction(param: null): null {
        return param;
    }

    @query([])
    voidIsNotNull() {
        print(
            'Even though they are both None in Python, for Candid null and void are different.'
        );
    }

    @query([], PartiallyNullRecord)
    getPartiallyNullRecord() {
        return {
            firstItem: 1n,
            secondItem: null,
            thirdItem: 3n
        };
    }

    @update([PartiallyNullRecord], PartiallyNullRecord)
    setPartiallyNullRecord(param: PartiallyNullRecord) {
        return param;
    }

    @query([], TwoNullRecord)
    getSmallNullRecord() {
        return {
            firstItem: null,
            secondItem: null
        };
    }

    @update([TwoNullRecord], TwoNullRecord)
    setSmallNullRecord(param: TwoNullRecord) {
        return param;
    }

    @query([], ThreeNullRecord)
    getLargeNullRecord() {
        return {
            firstItem: null,
            secondItem: null,
            thirdItem: null
        };
    }

    @update([ThreeNullRecord], ThreeNullRecord)
    setLargeNullRecord(param: ThreeNullRecord) {
        return param;
    }
}
