import { int, query, text } from 'azle';
import { sha224 } from 'js-sha256';

import { relativeImport } from './library';

export default class {
    @query([], text)
    relativeImport() {
        return relativeImport();
    }
    @query([text], text)
    packageImport(message) {
        return sha224.update(message).hex();
    }
    @query([], int)
    builtin() {
        return BigInt(Math.ceil(10.4));
    }
}
