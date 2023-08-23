import { IDL } from '@dfinity/candid';

export class Record {
    // @ts-ignore
    constructor(args) {
        if (
            // @ts-ignore
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
            // @ts-ignore
            this[propertyName] = args[propertyName];
        }
    }

    makeObjectLit() {
        let result = {};
        // @ts-ignore
        for (const propertyName in this.constructor._azleCandidMap) {
            // @ts-ignore
            if (!this[propertyName]) {
                throw `Missing property: ${propertyName}`;
            }
            result = {
                ...result,
                // @ts-ignore
                [propertyName]: this[propertyName]
            };
        }
        return result;
    }

    encode(): ArrayBuffer {
        return IDL.encode(
            // @ts-ignore
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
