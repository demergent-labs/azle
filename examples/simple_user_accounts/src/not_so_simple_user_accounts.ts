import { IDL } from '@dfinity/candid';
import { Record, int, nat32, text, bool, query } from 'azle';

globalThis.TextDecoder = require('text-encoding').TextDecoder;
globalThis.TextEncoder = require('text-encoding').TextEncoder;

class MyRecord extends Record {
    @int
    myInt: bigint;

    @nat32
    myNat32: number;

    @text
    myText: string;

    @bool
    myBool: boolean;

    // constructor(myInt: bigint, myNat32: bigint) {
    //     super({myInt: myInt, myNat32: myNat32})
    // }
}

export default class {
    @query([IDL.Text, IDL.Text], IDL.Text)
    test(param1: string, param2: string): string {
        return param1 + param2;
    }
    @query([IDL.Text, IDL.Text], IDL.Text)
    simpleQuery(param1: string, param2: string): string {
        return param1 + param2;
    }

    @query([MyRecord.getIDL()], MyRecord.getIDL())
    echoRecord(record: MyRecord): MyRecord {
        return record;
    }
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
