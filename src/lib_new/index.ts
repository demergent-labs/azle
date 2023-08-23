import { IDL } from '@dfinity/candid';

export class Record {
    // @ts-ignore
    constructor(args) {
        // @ts-ignore
        console.log(this.constructor._azleCandidMap);
        // @ts-ignore
        if (
            Object.entries(this.constructor._azleCandidMap).length !==
            Object.entries(args).length
        ) {
            throw 'Wrong number of properties';
        }

        // @ts-ignore
        for (const propertyName in this.constructor._azleCandidMap) {
            if (!args[propertyName]) {
                throw `Missing property: ${propertyName}`;
            }
            this[propertyName] = args[propertyName];
        }
    }

    makeObjectLit() {
        let result = {};
        // @ts-ignore
        for (const propertyName in this.constructor._azleCandidMap) {
            if (!this[propertyName]) {
                throw `Missing property: ${propertyName}`;
            }
            result = {
                ...result,
                [propertyName]: this[propertyName]
            };
        }
        return result;
    }

    encode(): ArrayBuffer {
        // @ts-ignore
        return IDL.encode(
            [this.constructor._azleEncoder],
            [this.makeObjectLit()]
        );
    }

    static decode(encoded: ArrayBuffer) {
        // @ts-ignore
        const objectLitArray = IDL.decode([this._azleEncoder], encoded);
        return new this(objectLitArray[0]);
    }

    static getIDL() {
        // @ts-ignore
        return this._azleEncoder;
    }
}

export function query(paramsIdls, returnIdl) {
    return (target, key, descriptor) => {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args) {
            const decoded = IDL.decode(paramsIdls, args[0]);
            // throw new Error(JSON.stringify(paramsIdls));
            // const decoded = IDL.decode(
            //     [
            //         IDL.Record({
            //             myNat32: IDL.Nat32,
            //             myInt: IDL.Int,
            //             myBool: IDL.Bool,
            //             myText: IDL.Text
            //         })
            //     ],
            //     args[0]
            // );

            // returnIdl = IDL.Record({
            //     myNat32: IDL.Nat32,
            //     myInt: IDL.Int,
            //     myBool: IDL.Bool,
            //     myText: IDL.Text
            // });

            return new Uint8Array(
                IDL.encode([returnIdl], [originalMethod(...decoded)])
            ).buffer;
        };

        return descriptor;
    };
}

// function update(paramsIdls, returnIdl) {
//     return (target, key, descriptor) => {
//         const originalMethod = descriptor.value;

//         descriptor.value = function (...args) {
//             const decoded = IDL.decode(paramsIdls, args[0]);

//             return new Uint8Array(
//                 IDL.encode([returnIdl], [originalMethod(...decoded)])
//             ).buffer;
//         };

//         return descriptor;
//     };
// }

// TODO when the decorator runs do something like make a instance property object that holds a map of name to idl type and then reference that in the serialze method in record
// class MyTemplate extends Record {
//     @candid((type = 'text'))
//     id: string;

//     @candid((type = 'float32'))
//     fav_num: number;

//     @nat32
//     fav_nat: number;

//     @int
//     fav_int: bigint;
// }

// export class Variant {
//     constructor(args) {
//         // @ts-ignore
//         Variant._azleCandidMap = this.constructor._azleCandidMap;
//         // @ts-ignore
//         Variant._azleEncoder = this.constructor._azleEncoder;

//         if (Object.entries(args).length !== 1) {
//             throw 'Wrong number of properties. Variant should only have one';
//         }

//         const variant = Object.keys(args)[0];

//         // @ts-ignore
//         if (!this.constructor._azleCandidMap[variant]) {
//             throw `${variant} is not a valid option for this variant`;
//         }

//         this[variant] = args[variant];
//     }
//     encode() {
//         console.log('Hello variant from encode');
//     }
//     decode() {
//         console.log('Hello variant from decode');
//     }
// }

// @ts-ignore
// export function query(paramsIdls, returnIdl) {
//     console.log('Hello from the query decorator');
//     // @ts-ignore
//     return (target, key, descriptor) => {
//         const originalMethod = descriptor.value;

//         descriptor.value = function (...args: any[]) {
//             const decoded = IDL.decode(paramsIdls, args[0]);

//             const result = new Uint8Array(
//                 IDL.encode([returnIdl], [originalMethod(...decoded)])
//             ).buffer;

//             return originalMethod(...decoded);
//         };

//         return descriptor;
//     };
// }

// @ts-ignore
function addToAzleCandidMap(target, idl, name) {
    // TODO I forsee an issue where we have naming conflicts
    if (!target.constructor._azleCandidMap) {
        target.constructor._azleCandidMap = {};
    }

    target.constructor._azleCandidMap = {
        ...target.constructor._azleCandidMap,
        [name]: idl
    };
    target.constructor._azleEncoder = IDL.Record(
        target.constructor._azleCandidMap
    );
}

// @ts-ignore
export function int(target, key) {
    addToAzleCandidMap(target, IDL.Int, key);
}

// @ts-ignore
export function nat32(target, key) {
    addToAzleCandidMap(target, IDL.Nat32, key);
}

export function text(target, key) {
    addToAzleCandidMap(target, IDL.Text, key);
}

export function bool(target, key) {
    addToAzleCandidMap(target, IDL.Bool, key);
}

// class SimpleQuery {
//     @query([IDL.Text, IDL.Text], IDL.Text)
//     simpleQuery(param1: string, param2: string): string {
//         return param1 + param2;
//     }

//     @query([MyRecord.getIDL()], MyRecord.getIDL())
//     echoRecord(record: MyRecord): MyRecord {
//         return record;
//     }
// }

// class Temperature extends Variant {
//     @int
//     Cool?: bigint;

//     @int
//     Warm?: bigint;

//     @int
//     Hot?: bigint;

//     @int
//     Cold?: bigint;
// }

// console.log('Starting up');
// const mySimpleQuery = new SimpleQuery();

// let params = IDL.encode([IDL.Text, IDL.Text], ['Hello', 'World']);

// // @ts-ignore
// const simpleQueryResult = mySimpleQuery.simpleQuery(params);
// console.log(simpleQueryResult);

// const myRecord = new MyRecord({
//     myText: 'Hello',
//     myInt: 3n,
//     myBool: true,
//     myNat32: 4
// });
// console.log(myRecord);

// const myTemp = new Temperature({ Hot: 7n });
// console.log(myTemp);

// const encodedMyRecord = myRecord.encode();
// const decodedMyRecord = MyRecord.decode(encodedMyRecord);
// console.log(decodedMyRecord);
// console.log('>>>>> END ');
