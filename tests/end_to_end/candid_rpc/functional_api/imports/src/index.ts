import { Canister, int, query, text } from 'azle/experimental';
import { sha224 } from 'js-sha256';

import { one, three, two } from './library';

export default Canister({
    getOne: query([], text, () => {
        return one();
    }),
    getTwo: query([], text, () => {
        return two();
    }),
    getThree: query([], text, () => {
        return three();
    }),
    sha224Hash: query([text], text, (message) => {
        return sha224.update(message).hex();
    }),
    getMathMessage: query([], int, () => {
        return BigInt(Math.ceil(10.4));
    })
});
