import { IDL } from './index';
import { Parent, processMap } from './utils';

// Without this default constructor we get errors when initializing variants and
// records. While the decorators are able to add constructors they are not
// communicating that change to the type checker. If we can get it to do that
// then we can get rid of this class
export abstract class Record {
    constructor(args: any) {
        if (
            Object.entries(this.constructor._azleCandidMap).length !==
            Object.entries(args).length
        ) {
            throw `Wrong number of properties: expected ${
                Object.entries(this.constructor._azleCandidMap).length
            } got ${Object.entries(args).length}`;
        }

        for (const propertyName in this.constructor._azleCandidMap) {
            if (!(propertyName in args)) {
                throw `Missing property: ${propertyName}`;
            }
            this[propertyName] = args[propertyName];
        }
    }

    static getIDL(parents: Parent[]) {
        const idl = IDL.Rec();
        idl.fill(
            IDL.Record(
                processMap(this._azleCandidMap, [
                    ...parents,
                    {
                        idl: idl,
                        name: this.name
                    }
                ])
            )
        );
        return idl;
    }

    static create<T extends Constructor>(
        this: T,
        props: InstanceType<T>
    ): InstanceType<T> {
        return new this(props) as InstanceType<T>;
    }
}

type Constructor<T = {}> = new (...args: any[]) => T;

// makeObjectLit() {
//     let result = {};
//     // @ts-ignore
//     for (const propertyName in target.constructor._azleCandidMap) {
//         // @ts-ignore
//         if (!target[propertyName]) {
//             throw `Missing property: ${propertyName}`;
//         }
//         result = {
//             ...result,
//             // @ts-ignore
//             [propertyName]: target[propertyName]
//         };
//     }
//     return result;
// }

// encode(): ArrayBuffer {
//     return IDL.encode(
//         // @ts-ignore
//         [target.constructor._azleEncoder],
//         [target.makeObjectLit()]
//     );
// }

// static decode(encoded: ArrayBuffer) {
//     // @ts-ignore
//     const objectLitArray = IDL.decode([target._azleEncoder], encoded);
//     return new target(objectLitArray[0]);
// }

// export function record<T extends new (...args: any[]) => any>(target: T) {
//     Object.getOwnPropertyNames(Record.prototype).forEach((name) => {
//         if (name !== 'constructor') {
//             target.prototype[name] = Record.prototype[name];
//         }
//     });
//     return target;
// }
