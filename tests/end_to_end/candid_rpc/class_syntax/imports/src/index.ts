import { int, query, text } from 'azle/experimental';
import { sha224 } from 'js-sha256';

import { one, three, two } from './library';

export default class {
    @query([], text)
    getOne() {
        return one();
    }
    @query([], text)
    getTwo() {
        return two();
    }
    @query([], text)
    getThree() {
        return three();
    }
    @query([text], text)
    sha224Hash(message) {
        return sha224.update(message).hex();
    }
    @query([], int)
    getMathMessage() {
        return BigInt(Math.ceil(10.4));
    }
}
