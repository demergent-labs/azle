/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IDL, query } from 'azle';
import jsSHA from 'jssha';

import { relativeImport } from './library';

export default class {
    @query([], IDL.Text)
    relativeImport() {
        return relativeImport();
    }

    @query([IDL.Text], IDL.Text)
    packageImport(message) {
        return new jsSHA('SHA-224', 'TEXT').update(message).getHash('HEX');
    }

    @query([], IDL.Int)
    builtin() {
        return BigInt(Math.ceil(10.4));
    }
}
