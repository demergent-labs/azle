import { IDL } from '@dfinity/candid';

export class Variant {
    // @ts-ignore
    constructor(args) {
        if (Object.entries(args).length !== 1) {
            throw 'Wrong number of properties. Variant should only have one';
        }

        const variant = Object.keys(args)[0];

        // @ts-ignore
        if (!this.constructor._azleCandidMap[variant]) {
            throw `${variant} is not a valid option for this variant`;
        }

        // @ts-ignore
        this[variant] = args[variant];
    }

    static getIDL() {
        // @ts-ignore
        return this._azleEncoder;
    }
}
