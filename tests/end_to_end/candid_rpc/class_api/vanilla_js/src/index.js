/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { IDL, query } from 'azle';
import { sha224 } from 'js-sha256';

import { relativeImport } from './library';

export default class {
    @query([], IDL.Text)
    relativeImport() {
        return relativeImport();
    }

    @query([IDL.Text], IDL.Text)
    packageImport(message) {
        return sha224.update(message).hex();
    }

    @query([], IDL.Int)
    builtin() {
        return BigInt(Math.ceil(10.4));
    }
}
