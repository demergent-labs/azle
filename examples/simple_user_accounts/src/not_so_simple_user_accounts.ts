import { IDL } from '@dfinity/candid';
// import { nat32, Vec } from './test';

// import { getType } from 'tst-reflect';

// const canister = new Canister();

// canister.query([nat32, bool], text, (param1, param2) => {

// });

type nat32 = number;
const nat32 = IDL.Nat32;

type Vec<T> = T[];
const _azleTypeVec = {
    name: 'Vec',
    typeArguments: [
        {
            name: '_azleTypenat32'
        }
    ]
};

const _azleTypeTestRoomba = '[_azleTypenat32, _azleTypenat32], ';

type coolboy = nat32;

const RuntimeTypeInformation = {
    queryMethods: {
        testRoomba: {
            params: [
                {
                    name: 'param1',
                    type: {
                        kind: 'typeRef',
                        name: 'coolboy',
                        module: '/home/lastmjs/index.ts',
                        parent: {
                            kind: 'typeAlias',
                            name: 'monkey',
                            module: '/',
                            parent: {
                                kind: 'root/azle',
                                name: 'nat32'
                            }
                        }
                    }
                }
            ],
            return: {}
        }
    }
};

const IDLs = {
    queryMethods: {
        testRoomba: {
            params: [IDL.Nat32, IDL.Text],
            return: IDL.Bool
        }
    }
};

export function testRoomba<query>(param1: coolboy, param2: nat32): Vec<nat32> {
    return [param1, param2];
}

// This is working but does not enforce the correct number of lambda params
type IDLToTS = {
    Nat32: number;
    Text: string;
    // ... add other mappings as required
};

function endpoint<P extends (keyof IDLToTS)[], R extends keyof IDLToTS>(
    paramTypes: [...P],
    returnType: R,
    fn: (...args: { [K in keyof P]: IDLToTS[P[K]] }) => IDLToTS[R]
): (...args: { [K in keyof P]: IDLToTS[P[K]] }) => IDLToTS[R] {
    // Do your mapping or other logic here
    return fn;
}
// This is working but does not enforce the correct number of lambda params

endpoint(['Nat32', 'Text'], 'Text', (param1, param2) => {
    return param2;
});

// This is working great if we assume one parameter per function
// type IDLToTS = {
//     Nat32: number;
//     Text: string;
//     // ... add other mappings as required
// };

// type MapIDLToTS<T extends keyof IDLToTS> = IDLToTS[T];

// function endpoint<P extends keyof IDLToTS, R extends keyof IDLToTS>(
//     paramType: P,
//     returnType: R,
//     fn: (arg: MapIDLToTS<P>) => MapIDLToTS<R>
// ): (arg: MapIDLToTS<P>) => MapIDLToTS<R> {
//     // Do your mapping or other logic here
//     return fn;
// }

// endpoint('Nat32', 'Text', (param1) => {
//     return 'hello';
// });

// type TypeToIDL = {
//     number: typeof IDL.Nat32;
//     string: typeof IDL.Text;
//     // Add more mappings as required
// };

// Here we define a simple utility type that maps TypeScript types to their corresponding IDL object types.
// type IDLRepresentation<T> = T extends keyof TypeToIDL ? TypeToIDL[T] : never;

// function endpoint<A, R>(
//     fn: (args: A) => R,
//     idlTypes: { args: IDLRepresentation<A>; ret: IDLRepresentation<R> }
// ): (args: A) => R {
//     return (args: A): R => {
//         // This can be enhanced to transform the args based on IDL type, if needed.
//         return fn(args);
//     };
// }

// const add = endpoint((x) => x + x, { args: IDL.Nat32, ret: IDL.Nat32 });

// console.log('logging from main file', getType(testRoomba));

// @func([text, text], int, 'query')
// class MyFunc {}

// @func([text, bool], int, 'update')
// class NewFunc {}

// @variant
// class Temperature extends Variant {
//     @candid(Null)
//     Cool?: Null;

//     @candid(int)
//     Warm?: int;

//     @candid(nat)
//     Hot?: nat;

//     @candid(Null)
//     Cold?: Null;
// }

// @record
// class MySimpleRecord extends Record {
//     @candid(int)
//     myInt: int;
// }

@record
class MyRecord extends Record {
    @candid(int)
    myInt: int;

    @candid(newNat32)
    myNat32: newNat32;

    @candid(text)
    myText: text;

    @candid(bool)
    myBool: bool;

    @candid(blob)
    myBlob: blob;

    @candid(Opt(bool))
    myOptBool: Opt<boolean>;

    @candid(VecCandid(int))
    myVecInt: Vec<bigint>;
}

export default class {
    @query([nat32, MyRecord], Vec(Nat32))
    testRoomba(param1: string, param2: MyRecord) {
        throw new Error('it definitely is not this one');
        return [param1, param2];
    }
    @query([text, text], text)
    simpleQuery(param1: text, param2: text): text {
        return param1 + param2;
    }
    @query([MyRecord], MyRecord)
    echoRecord(record: MyRecord): MyRecord {
        return record;
    }
    @query([MySimpleRecord], MySimpleRecord)
    echoSimpleRecord(record: MySimpleRecord): MySimpleRecord {
        return record;
    }
    @query([Temperature], Temperature)
    echoVariant(temp: Temperature): Temperature {
        return temp;
    }
    @query([MyFunc], MyFunc)
    echoFunc(myFunc: MyFunc): MyFunc {
        console.log(myFunc);
        return myFunc;
    }
    @query([], NewFunc)
    returnFunc(): NewFunc {
        return [];
    }
    @query([], Void)
    returnVoid(): Void {
        return;
    }
    @query([], int)
    returnInt(): int {
        let thing = new MySimpleRecord({ myInt: 3n });
        return thing.myInt;
    }

    @query([], nat64)
    returnInstructionCounter(param1: text): nat64 {
        // console.log(JSON.stringify(RuntimeTypes.typeOf([MyRecord])));

        // console.log(JSON.stringify(RuntimeTypes.typeInfer(MyRecord)));

        function log(param1: text, param2: number): boolean {
            return true;
        }

        // console.log(RuntimeTypes.typeOf([log]));
        // console.log(RuntimeTypes.typeInfer(log));
        // console.log(RuntimeTypes.resolveRuntimeType(log));
        // console.log(log.__type);

        // console.log(JSON.stringify(RuntimeTypes.Processor.get().reflect(log)));

        // console.log(RuntimeTypes.resolveRuntimeType(MySimpleRecord));

        // console.log('you');
        // console.log(stringifyCircular(RuntimeTypes.resolveRuntimeType(log)));
        // console.log('are');

        return ic.instructionCounter();
    }
}

// function stringifyCircular(obj: {}) {
//     const seen = new Set();
//     return JSON.stringify(obj, (key, value) => {
//         if (typeof value === 'object' && value !== null) {
//             if (seen.has(value)) {
//                 return; // or you could replace with some string, e.g., "[Circular]"
//             }
//             seen.add(value);
//         }
//         return value;
//     });
// }

// function log(param1: text, param2: number): boolean {
//     return true;
// }

// console.log(
//     RuntimeTypes.resolveRuntimeType(log, [], {
//         reuseCached: false
//     })
// );

// // console.log(log.__type);

// const MyRecord = Record({
//     id: string
// });

query([text, nat32], bool, (param1: coolboy, param2) => {});
