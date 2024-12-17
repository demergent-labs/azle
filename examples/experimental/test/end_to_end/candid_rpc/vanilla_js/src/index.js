import { Canister, int, query, text } from 'azle/experimental';
import { sha224 } from 'js-sha256';

import { relativeImport } from './library';

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
