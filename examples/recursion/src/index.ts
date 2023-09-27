import { query, Service, text, Tuple, Vec, Void } from 'azle';
import { Record, Recursive, int8, Variant, Opt } from 'azle';

// These are the types that can be recursive
// Record
//     Record can't be recursive by itself. It needs something to be able to terminate it. It needs to work with Variants, Opts, and Vec
// const optRecord = Record({ myOpt: Opt(Recursive(() => optRecord)) });
// const vecRecord = Record({ myVecRecords: Vec(Recursive(() => vecRecord)) });
const varRecord = Record({ myVar: Recursive(() => myVar) });
// TODO I would prefer this syntax
// const varRecord = Recursive(() => Record({ myVar: myVar }));
// const vecRecord = Recursive(() => Record({ myVecRecords: Vec(vecRecord) }));
// const optRecord = Recursive(() => Record({ myOpt: Opt(optRecord) }));
const myVar = Variant({ num: int8, varRec: varRecord });
// Variant
//     Variant is the only type that can be recursive all by itself but it does need a way to end the recursion
const recVariant = Variant({
    num: int8,
    recVariant: Recursive(() => recVariant)
});
// Tuple
const optTuple = Recursive(() => Tuple(Opt(optTuple), Opt(optTuple)));
const vecTuple = Recursive(() => Vec(vecTuple));
// const varTuple = Recursive(() => Tuple(myTupleVar, myTupleVar));
const varTuple = Tuple(
    Recursive(() => myTupleVar),
    Recursive(() => myTupleVar)
);
const myTupleVar = Variant({ num: int8, varTuple: varTuple });
// Vec
//      Vec can't be recursive by itself. At the end of it all it needs to have a concrete type.
// Opt
// Service
// Func

export default Service({
    // optRecord: query([optRecord], optRecord, (param) => param),
    // vecRecord: query([vecRecord], vecRecord, (param) => param),
    testRecRecordWithVariant: query([varRecord], varRecord, (param) => param),
    testRecVariant: query([recVariant], recVariant, (param) => param),
    // optTuple: query([optTuple], optTuple, (param) => param),
    // vecTuple: query([vecTuple], vecTuple, (param) => param),
    // optRecordReturn: query([], optRecord, () => {
    //     throw '';
    // }),
    // vecRecordReturn: query([], vecRecord, () => {
    //     throw '';
    // }),
    testRecRecordWithVariantReturn: query([], varRecord, () => {
        return {
            myVar: {
                varRec: { myVar: { varRec: { myVar: { num: 7 } } } }
            }
        };
    }),
    testRecVariantReturn: query([], recVariant, () => {
        return {
            recVariant: { recVariant: { recVariant: { num: 12 } } }
        };
    }),
    // optTupleReturn: query([], optTuple, () => {
    //     throw '';
    // }),
    // vecTupleReturn: query([], vecTuple, () => {
    //     throw '';
    // }),
    testRecTupleWithVariant: query([varTuple], varTuple, (param) => param),
    testRecTupleWithVariantReturn: query([], varTuple, () => {
        return [
            {
                varTuple: [
                    { varTuple: [{ num: 70 }, { num: 7 }] },
                    { varTuple: [{ num: 3 }, { num: 12 }] }
                ]
            },
            { varTuple: [{ num: 40 }, { varTuple: [{ num: 5 }, { num: 10 }] }] }
        ];
    })
});

// Below we have a bunch of different configurations of where to put the the
// recursive class and how to put them all together
const node0 = Variant({
    optRec: Record({ child: Opt(Recursive(() => node0)) }),
    tupleRec: Record({
        twins: Tuple(
            Recursive(() => node0),
            Recursive(() => node0)
        )
    }),
    vecRec: Record({ children: Vec(Recursive(() => node0)) }),
    recordRec: Record({ myVar: Recursive(() => node0) })
});

const node1 = Variant({
    recOpt: Recursive(() => Record({ child: Opt(node1) })),
    recTuple: Recursive(() =>
        Record({
            twins: Tuple(node1, node1)
        })
    ),
    recVec: Recursive(() => Record({ children: Vec(node0) })),
    recRecord: Recursive(() => Record({ myVar: node0 }))
});

const node2 = Recursive(() =>
    Variant({
        optChild: Record({ child: Opt(node2) }),
        twinChildren: Record({
            twins: Tuple(node2, node2)
        }),
        children: Record({ children: Vec(node2) }),
        child: Record({ myVar: node2 })
    })
);

const node3 = Recursive(() =>
    Variant({
        optChild: Opt(node3),
        twinChildren: Tuple(node3, node3),
        children: Vec(node3),
        child: Record({ myVar: node3 })
    })
);

const node4 = Variant({
    optChild: Recursive(() => Opt(node4)),
    twinChildren: Recursive(() => Tuple(node4, node4)),
    children: Recursive(() => Vec(node4)),
    child: Recursive(() => Record({ myVar: node4 }))
});

const node5 = Variant({
    optChild: Opt(Recursive(() => node5)),
    twinChildren: Tuple(
        Recursive(() => node5),
        Recursive(() => node5)
    ),
    children: Vec(Recursive(() => node5)),
    child: Record({ myVar: Recursive(() => node5) })
});
