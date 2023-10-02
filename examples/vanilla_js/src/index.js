import { Canister, int, query, text } from 'azle';
import { relativeImport } from './library';
import { sha224 } from 'js-sha256';

export default Canister({
    relativeImport: query([], text, () => {
        return relativeImport();
    }),
    packageImport: query([text], text, (message) => {
        return sha224.update(message).hex();
    }),
    builtin: query([], int, () => {
        return BigInt(Math.ceil(10.4));
    })
});
