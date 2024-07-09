import { call, IDL, Principal, query, trap, update } from 'azle';

import { MyCanister as MyFullCanister } from '../recursive_canister/types';

// These are the types that can be recursive
// Record
//     Record can't be recursive by itself. It needs something to be able to terminate it. It needs to work with Variants, Opts, and Vec
const varRecord = IDL.Rec();
varRecord.fill(
    IDL.Record({ myVar: IDL.Variant({ num: IDL.Int8, varRec: varRecord }) })
);
type varRecord = { myVar: { num: number } | { varRec: varRecord } };
const vecRecord = IDL.Rec();
vecRecord.fill(IDL.Record({ myVecRecords: IDL.Vec(vecRecord) }));
type vecRecord = { myVecRecords: vecRecord[] };
const optRecord = IDL.Rec();
optRecord.fill(IDL.Record({ myOpt: IDL.Opt(optRecord) }));
type optRecord = { myOpt: [optRecord] | [] };
// Variant
//     Variant is the only type that can be recursive all by itself but it does need a way to end the recursion
const recVariant = IDL.Rec();
recVariant.fill(IDL.Variant({ num: IDL.Int8, recVariant: recVariant }));
type recVariant = { num: number } | { recVariant: recVariant };
// Tuple
const optTuple = IDL.Rec();
optTuple.fill(IDL.Tuple(IDL.Opt(optTuple), IDL.Opt(optTuple)));
type optTuple = [[optTuple] | [], [optTuple] | []];
const vecTuple = IDL.Rec();
vecTuple.fill(IDL.Tuple(IDL.Vec(vecTuple), IDL.Vec(vecTuple)));
type vecTuple = [vecTuple[], vecTuple[]];
const myTupleVar = IDL.Rec();
const varTuple = IDL.Rec();
varTuple.fill(IDL.Tuple(myTupleVar, myTupleVar));
type varTuple = [myTupleVar, myTupleVar];
myTupleVar.fill(IDL.Variant({ num: IDL.Int8, varTuple }));
type myTupleVar = { num: number } | { varTuple: varTuple };
// Vec
const varVec = IDL.Rec();
varVec.fill(IDL.Vec(IDL.Variant({ Leaf: IDL.Int8, Branch: varVec })));
type varVec = ({ Leaf: number } | { Branch: varVec })[];
const optVec = IDL.Rec();
optVec.fill(IDL.Vec(IDL.Opt(optVec)));
type optVec = ([optVec] | [])[];
const tupleVec = IDL.Rec();
tupleVec.fill(IDL.Vec(IDL.Tuple(tupleVec, tupleVec)));
type tupleVec = [tupleVec, tupleVec][];
const vecVec = IDL.Rec();
vecVec.fill(IDL.Vec(vecVec));
type vecVec = vecVec[];
// IDL.Opt
const varOpt = IDL.Rec();
varOpt.fill(IDL.Opt(IDL.Variant({ Leaf: IDL.Int8, Branch: varOpt })));
type varOpt = [{ Leaf: number } | { Branch: varVec }] | [];
const optOpt = IDL.Rec();
optOpt.fill(IDL.Opt(optOpt));
type optOpt = [optOpt] | [];
const tupleOpt = IDL.Rec();
tupleOpt.fill(IDL.Opt(IDL.Tuple(tupleOpt, tupleOpt)));
type tupleOpt = [[tupleOpt, tupleOpt]] | [];
const vecOpt = IDL.Rec();
vecOpt.fill(IDL.Opt(IDL.Vec(vecOpt)));
type vecOpt = [vecOpt[]] | [];
// Service
const MyCanister = IDL.Rec();
MyCanister.fill(
    IDL.Service({
        myQuery: IDL.Func([MyCanister], [MyCanister], ['query'])
    })
);
type MyCanister = Principal;
// Func
const myFunc = IDL.Rec();
myFunc.fill(IDL.Func([myFunc], [myFunc], ['query']));
type myFunc = [Principal, string];

export default class {
    @query([varVec], varVec)
    testRecVecWithVariant(param: varVec): varVec {
        return param;
    }

    @query([optVec], optVec)
    testRecVecWithOpt(param: optVec): optVec {
        return param;
    }

    @query([tupleVec], tupleVec)
    testRecVecWithTuple(param: tupleVec): tupleVec {
        return param;
    }

    @query([vecVec], vecVec)
    testRecVecWithVec(param: vecVec): vecVec {
        return param;
    }

    @query([varOpt], varOpt)
    testRecOptWithVariant(param: varOpt): varOpt {
        return param;
    }

    @query([optOpt], optOpt)
    testRecOptWithOpt(param: optOpt): optOpt {
        return param;
    }

    @query([tupleOpt], tupleOpt)
    testRecOptWithTuple(param: tupleOpt): tupleOpt {
        return param;
    }

    @query([vecOpt], vecOpt)
    testRecOptWithVec(param: vecOpt): vecOpt {
        return param;
    }

    @query([optRecord], optRecord)
    testRecRecordWithOpt(param: optRecord): optRecord {
        return param;
    }

    @query([vecRecord], vecRecord)
    testRecRecordWithVec(param: vecRecord): vecRecord {
        return param;
    }

    @query([varRecord], varRecord)
    testRecRecordWithVariant(param: varRecord): varRecord {
        return param;
    }

    @query([recVariant], recVariant)
    testRecVariant(param: recVariant): recVariant {
        return param;
    }

    @query([optTuple], optTuple)
    testRecTupleWithOpt(param: optTuple): optTuple {
        return param;
    }

    @query([vecTuple], vecTuple)
    testRecTupleWithVec(param: vecTuple): vecTuple {
        return param;
    }

    @query([], optRecord)
    testRecRecordWithOptReturn(): optRecord {
        return { myOpt: [{ myOpt: [{ myOpt: [] }] }] };
    }

    @query([], vecRecord)
    testRecRecordWithVecReturn(): vecRecord {
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
    }

    @query([], varRecord)
    testRecRecordWithVariantReturn(): varRecord {
        return {
            myVar: {
                varRec: { myVar: { varRec: { myVar: { num: 7 } } } }
            }
        };
    }

    @query([], recVariant)
    testRecVariantReturn(): recVariant {
        return {
            recVariant: { recVariant: { recVariant: { num: 12 } } }
        };
    }

    @query([], optTuple)
    testRecTupleWithOptReturn(): optTuple {
        return [[], [[[], []]]];
    }

    @query([], vecTuple)
    testRecTupleWithVecReturn(): vecTuple {
        return [
            [[[], [[[], []]]]],
            [
                [[], []],
                [[], []],
                [[], []],
                [[], []]
            ]
        ];
    }

    @query([varTuple], varTuple)
    testRecTupleWithVariant(param: varTuple): varTuple {
        return param;
    }

    @query([], varTuple)
    testRecTupleWithVariantReturn(): varTuple {
        return [
            {
                varTuple: [
                    { varTuple: [{ num: 70 }, { num: 7 }] },
                    { varTuple: [{ num: 3 }, { num: 12 }] }
                ]
            },
            { varTuple: [{ num: 40 }, { varTuple: [{ num: 5 }, { num: 10 }] }] }
        ];
    }

    @query([myFunc], myFunc)
    testRecFunc(param: myFunc): myFunc {
        return param;
    }

    @query([], myFunc)
    testRecFuncReturn(): myFunc {
        return [Principal.fromText('aaaaa-aa'), 'create_canister'];
    }

    @query([MyCanister], MyCanister)
    testRecServiceSimple(param: MyCanister): MyCanister {
        return param;
    }

    @query([MyFullCanister], MyFullCanister)
    testRecService(param: MyFullCanister): MyFullCanister {
        return param;
    }

    @query([], MyFullCanister)
    testRecServiceReturn(): MyFullCanister {
        return Principal.fromText(
            process.env.MY_CANISTER_PRINCIPAL ??
                // Principal.fromText('asrmz-lmaaa-aaaaa-qaaeq-cai') ??
                trap('process.env.MY_CANISTER_PRINCIPAL is undefined')
        );
    }

    @update([MyFullCanister], MyFullCanister)
    async testRecServiceCall(
        myFullCanister: MyFullCanister
    ): Promise<MyFullCanister> {
        return await call(myFullCanister, 'myQuery', {
            paramIdls: [MyFullCanister],
            returnIdl: MyFullCanister,
            args: [myFullCanister]
        });
    }
}
