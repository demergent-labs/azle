import { IDL } from '@dfinity/candid';

// Without this default constructor we get errors when initializing variants and
// records. While the decorators are able to add constructors they are not
// communicating that change to the type checker. If we can get it to do that
// then we can get rid of this class
export class Variant {
    constructor(throwAway: any) {}
}

export function variant<T extends new (...args: any[]) => any>(target: T) {
    return class extends target {
        constructor(...args: any[]) {
            super(...args);
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
            return IDL.Variant(target._azleCandidMap);
        }
    };
}
