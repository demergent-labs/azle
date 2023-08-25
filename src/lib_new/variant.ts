import { IDL } from '@dfinity/candid';

export function variant(target) {
    return class extends target {
        constructor(...args) {
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
