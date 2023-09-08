import { query, int, Service, text } from 'azle';
import { one, two, three } from './library';
import { sha224 } from 'js-sha256';

export default class extends Service {
    @query([], text)
    getOne(): text {
        return one();
    }

    @query([], text)
    getTwo(): text {
        return two();
    }

    @query([], text)
    getThree(): text {
        return three();
    }

    @query([text], text)
    sha224Hash(message: text): text {
        return sha224.update(message).hex();
    }

    @query([], int)
    getMathMessage(): int {
        return BigInt(Math.ceil(10.4));
    }
}
