import { Canister, ic, int, Null, query, Record, update, Void } from 'azle';

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

export default Canister({
    nullFunction: query([Null], Null, (param) => {
        return param;
    }),
    voidIsNotNull: query([], Void, () => {
        ic.print(
            'Even though they are both None in Python, for Candid null and void are different.'
        );
    }),
    getPartiallyNullRecord: query([], PartiallyNullRecord, () => {
        return {
            firstItem: 1n,
            secondItem: null,
            thirdItem: 3n
        };
    }),
    setPartiallyNullRecord: update(
        [PartiallyNullRecord],
        PartiallyNullRecord,
        (param) => {
            return param;
        }
    ),
    getSmallNullRecord: query([], TwoNullRecord, () => {
        return {
            firstItem: null,
            secondItem: null
        };
    }),
    setSmallNullRecord: update([TwoNullRecord], TwoNullRecord, (param) => {
        return param;
    }),
    getLargeNullRecord: query([], ThreeNullRecord, () => {
        return {
            firstItem: null,
            secondItem: null,
            thirdItem: null
        };
    }),
    setLargeNullRecord: update([ThreeNullRecord], ThreeNullRecord, (param) => {
        return param;
    })
});
