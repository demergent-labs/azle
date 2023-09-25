import { query, int, Service, text } from 'azle';
import { one, two, three } from './library';
import { sha224 } from 'js-sha256';

export default Service({
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
