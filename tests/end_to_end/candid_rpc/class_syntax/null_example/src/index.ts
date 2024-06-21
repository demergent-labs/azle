import { IDL, query, update } from 'azle';

const PartiallyNullRecord = Record({
    firstItem: int,
    secondItem: Null,
    thirdItem: int
});

const TwoNullRecord = Record({
    firstItem: Null,
    secondItem: Null
});

const ThreeNullRecord = Record({
    firstItem: Null,
    secondItem: Null,
    thirdItem: Null
});

export default class {
    @query([Null], Null)
    nullFunction(param) {
        return param;
    }
    @query([])
    voidIsNotNull() {
        ic.print(
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
    setPartiallyNullRecord(param) {
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
    setSmallNullRecord(param) {
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
    setLargeNullRecord(param) {
        return param;
    }
}
