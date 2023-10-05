import {
    Func,
    ic,
    None,
    Principal,
    query,
    Canister,
    Some,
    Tuple,
    update,
    Vec,
    Record,
    Recursive,
    int8,
    Variant,
    Opt
} from 'azle';
import MyFullCanister from '../recursive_canister';

// These are the types that can be recursive
// Record
//     Record can't be recursive by itself. It needs something to be able to terminate it. It needs to work with Variants, Opts, and Vec
const varRecord = Recursive(() =>
    Record({ myVar: Variant({ num: int8, varRec: varRecord }) })
);
const vecRecord = Recursive(() => Record({ myVecRecords: Vec(vecRecord) }));
const optRecord = Recursive(() => Record({ myOpt: Opt(optRecord) }));
// Variant
//     Variant is the only type that can be recursive all by itself but it does need a way to end the recursion
const recVariant = Recursive(() =>
    Variant({ num: int8, recVariant: recVariant })
);
// Tuple
const optTuple = Recursive(() => Tuple(Opt(optTuple), Opt(optTuple)));
const vecTuple = Recursive(() => Tuple(Vec(vecTuple), Vec(vecTuple)));
const varTuple = Recursive(() => Tuple(myTupleVar, myTupleVar));
const myTupleVar = Variant({ num: int8, varTuple });
// Vec
const varVec = Recursive(() => Vec(Variant({ Leaf: int8, Branch: varVec })));
const optVec = Recursive(() => Vec(Opt(optVec)));
const tupleVec = Recursive(() => Vec(Tuple(tupleVec, tupleVec)));
const vecVec = Recursive(() => Vec(vecVec));
// Opt
const varOpt = Recursive(() => Opt(Variant({ Leaf: int8, Branch: varOpt })));
const optOpt = Recursive(() => Opt(optOpt));
const tupleOpt = Recursive(() => Opt(Tuple(tupleOpt, tupleOpt)));
const vecOpt = Recursive(() => Opt(Vec(vecOpt)));
// Service
const MyCanister = Recursive(() =>
    Canister({
        myQuery: query([MyCanister], MyCanister)
    })
);
// Func
const myFunc = Recursive(() => Func([myFunc], myFunc, 'query'));

export default Canister({
    testRecVecWithVariant: query([varVec], varVec, (param) => param),
    testRecVecWithOpt: query([optVec], optVec, (param) => param),
    testRecVecWithTuple: query([tupleVec], tupleVec, (param) => param),
    testRecVecWithVec: query([vecVec], vecVec, (param) => param),
    testRecOptWithVariant: query([varOpt], varOpt, (param) => param),
    testRecOptWithOpt: query([optOpt], optOpt, (param) => param),
    testRecOptWithTuple: query([tupleOpt], tupleOpt, (param) => param),
    testRecOptWithVec: query([vecOpt], vecOpt, (param) => param),
    testRecRecordWithOpt: query([optRecord], optRecord, (param) => param),
    testRecRecordWithVec: query([vecRecord], vecRecord, (param) => param),
    testRecRecordWithVariant: query([varRecord], varRecord, (param) => param),
    testRecVariant: query([recVariant], recVariant, (param) => param),
    testRecTupleWithOpt: query([optTuple], optTuple, (param) => param),
    testRecTupleWithVec: query([vecTuple], vecTuple, (param) => param),
    testRecRecordWithOptReturn: query([], optRecord, () => {
        return { myOpt: Some({ myOpt: Some({ myOpt: None }) }) };
    }),
    testRecRecordWithVecReturn: query([], vecRecord, () => {
        return {
            myVecRecords: [
                { myVecRecords: [{ myVecRecords: [] }] },
                {
                    myVecRecords: [
                        { myVecRecords: [] },
                        { myVecRecords: [{ myVecRecords: [] }] }
                    ]
                },
                { myVecRecords: [] }
            ]
        };
    }),
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
    testRecTupleWithOptReturn: query([], optTuple, () => {
        return [None, Some([None, None])];
    }),
    testRecTupleWithVecReturn: query([], vecTuple, () => {
        return [
            [[[], [[[], []]]]],
            [
                [[], []],
                [[], []],
                [[], []],
                [[], []]
            ]
        ];
    }),
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
    }),
    testRecFunc: query([myFunc], myFunc, (param) => param),
    testRecFuncReturn: query([], myFunc, () => [
        Principal.fromText('aaaaa-aa'),
        'create_canister'
    ]),
    testRecServiceSimple: query([MyCanister], MyCanister, (param) => param),
    testRecService: query([MyFullCanister], MyFullCanister, (param) => param),
    testRecServiceReturn: query([], MyFullCanister, () => {
        return MyFullCanister(
            Principal.fromText(
                process.env.MY_CANISTER_PRINCIPAL ??
                    // Principal.fromText('asrmz-lmaaa-aaaaa-qaaeq-cai') ??
                    ic.trap('process.env.MY_CANISTER_PRINCIPAL is undefined')
            )
        );
    }),
    testRecServiceCall: update(
        [MyFullCanister],
        MyFullCanister,
        async (myFullCanister) => {
            return await ic.call(myFullCanister.myQuery, {
                args: [myFullCanister]
            });
        }
    )
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
