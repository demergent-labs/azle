import { IDL, query, update } from 'azle';
import { sha224 } from 'js-sha256';

import { one, three, two } from './library';

export default class {
    @query([], IDL.Text)
    getOne() {
        return one();
    }
    @query([], IDL.Text)
    getTwo() {
        return two();
    }
    @query([], IDL.Text)
    getThree() {
        return three();
    }
    @query([IDL.Text], IDL.Text)
    sha224Hash(message) {
        return sha224.update(message).hex();
    }
    @query([], int)
    getMathMessage() {
        return BigInt(Math.ceil(10.4));
    }
}
