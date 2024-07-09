import { IDL, query } from 'azle';
import { sha224 } from 'js-sha256';

import { one, three, two } from './library';

export default class {
    @query([], IDL.Text)
    getOne(): string {
        return one();
    }

    @query([], IDL.Text)
    getTwo(): string {
        return two();
    }

    @query([], IDL.Text)
    getThree(): string {
        return three();
    }

    @query([IDL.Text], IDL.Text)
    sha224Hash(message: string): string {
        return sha224.update(message).hex();
    }

    @query([], IDL.Int)
    getMathMessage(): bigint {
        return BigInt(Math.ceil(10.4));
    }
}
